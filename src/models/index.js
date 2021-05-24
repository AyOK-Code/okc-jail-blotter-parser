const fs = require('fs')
const path = require('path')
const { Sequelize, DataTypes } = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../config/config.js`)[env]
const booking = require('./booking.js')
const offense = require('./offense.js')
const pdfs = require('./pdfs.js')
const person = require('./person.js')
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

db['Booking'] = booking(sequelize, DataTypes)
db['Offense'] = offense(sequelize, DataTypes)
db['Pdf'] = pdfs(sequelize, DataTypes)
db['Person'] = person(sequelize, DataTypes)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
