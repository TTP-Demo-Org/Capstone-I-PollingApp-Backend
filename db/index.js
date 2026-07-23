  require("dotenv").config()
  const { Sequelize } = require("sequelize")

  const DB_URL = process.env.DATABASE_URL ||
  "postgres://localhost:5432/polling_app"

  const isProductionDatabase =
    DB_URL.includes("neon.tech") ||
    DB_URL.includes("sslmode=require")

  const sequelizeOptions = isProductionDatabase
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {}

  const pollDb = new Sequelize(DB_URL, sequelizeOptions)

  module.exports = pollDb