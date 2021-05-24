const Sequelize = require('sequelize')
const crypto = require('crypto')
const { Person, Pdf, Booking, Offense } = require('./models')
const env = process.env.NODE_ENV || 'development'
const config = require('./config/config')[env]

exports.filterLinks = async function (links) {
  const sequelize = new Sequelize(config)
  const result = await sequelize.transaction(async (transaction) => {
    const pdfs = await Pdf.findAll({
      where: {
        postedOn: links.map(({ postedOn }) => postedOn)
      }
    })
    /* Sequelize erroneously adds timezone to DATEONLY on retrieval from MSSQL
    so we need to add a day to make it right */
    const existing = new Set(pdfs.map((x) => {
      let date = new Date(x.postedOn)
      date.setDate(date.getDate() + 1)
      return date.toISOString().split('T')[0]
    }))
    console.log(existing)
    console.log(new Date().getTimezoneOffset())
    return links.filter(({ postedOn }) => !existing.has(postedOn))
  })
  await sequelize.close()
  return result
}

exports.save = async function (processed) {
  if (processed.length === 0) {
    return
  }
  const sequelize = new Sequelize(config)

  await sequelize.transaction(async (transaction) => {
    await Promise.all(processed.map(async ({ rows, postedOn }) => {
      const pdf = await Pdf.create(
        { postedOn },
        { transaction }
      )
      await Promise.all(rows.map(async (row) => {
        const hash = crypto.createHash('sha256')
        hash.update(`${row.first_name} ${row.last_name} ${row.dob}`)
        row.hash = hash.digest('base64')
        if (!("dob" in row)) {
          row.dob = null
        }
        const [person] = await Person.upsert(
          row,
          { transaction, returning: true }
        )

        const booking = await Booking.create(
          { ...row, personId: person.id, pdfId: pdf.id },
          { transaction }
        )

        await Offense.bulkCreate(
          row.offenses.map((offense) => ({ ...offense, bookingId: booking.id })),
          { transaction }
        )
      }))
    }))
  })

  await sequelize.close()
}
