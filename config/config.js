require('dotenv').config();
module.exports = {
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    logging: console.log,
    // lockTimeout: 10000
  },
  development: {
    username: "root",
    password: "root",
    database: "wynk",
    host: "localhost",
    port: 8889,
    dialect: process.env.DIALECT,
    logging: console.log,
    // lockTimeout: 10000
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    logging: false,
    // lockTimeout: 10000
  },
};