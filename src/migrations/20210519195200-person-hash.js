module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      return Promise.all([
        queryInterface.addColumn('people', 'hash', {
          allowNull: false,
          type: Sequelize.STRING
        },
        { transaction })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('people', 'hash', { transaction })
    ])
  }
}