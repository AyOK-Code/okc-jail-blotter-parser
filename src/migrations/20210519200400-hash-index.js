module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      return Promise.all([
        queryInterface.addIndex(
          'people',
          {
            name: 'idx_hash',
            unique: true,
            using: 'BTREE',
            fields: ['hash']
          },
          { transaction }
        )
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropIndex('idx_hash')
    ])
  }
}