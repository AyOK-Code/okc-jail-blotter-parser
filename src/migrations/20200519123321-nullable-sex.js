module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      return Promise.all([
        queryInterface.changeColumn('people', 'sex', {
          allowNull: true,
          type: Sequelize.STRING
        },
        { transaction }),
        queryInterface.changeColumn('bookings', 'sex', {
          allowNull: true,
          type: Sequelize.STRING
        },
        { transaction })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('people', 'sex', {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('bookings', 'sex', {
        allowNull: false,
        type: Sequelize.STRING
      })
    ])
  }
}
