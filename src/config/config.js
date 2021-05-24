module.exports = {
  development: {
    username: 'sa',
    password: 'Password@123',
    database: 'temp',
    host: '0.0.0.0',
    dialect: 'mssql',
    dialectOptions: {
      dateFirst: 1,
      useUTC: false
    }
  },
  localprod: {
    username: 'dev',
    password: process.env.PROD_DB_PASSWORD,
    database: 'justice_data',
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mssql',
    dialectOptions: {
      dateFirst: 1,
      useUTC: true
    }
  },
  production: {
    username: 'dev',
    password: process.env.PROD_DB_PASSWORD,
    database: 'justice_data',
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mssql',
    dialectOptions: {
      dateFirst: 1,
      useUTC: true
    }
  }
}
