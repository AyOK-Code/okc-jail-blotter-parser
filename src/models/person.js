module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    hash: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    firstName: {
      allowNull: false,
      type: DataTypes.TEXT,
      field: 'first_name',
    },
    lastName: {
      allowNull: false,
      type: DataTypes.TEXT,
      field: 'last_name'
    },
    dob: {
      allowNull: true,
      type: DataTypes.DATEONLY
    },
    sex: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    race: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    zip: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    transient: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'people',
    indexes: [{
      name: 'idx_identity',
      unique: true,
      using: 'BTREE',
      fields: ['first_name', 'last_name', 'dob']
    },{
      name: "idx_hash",
      unique: true,
      using: 'BTREE',
      fields: ['hash']
    }]
  })
  Person.associate = function (models) {
    Person.hasMany(models.Booking)
  }
  return Person
}
