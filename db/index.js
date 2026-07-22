require("dotenv").config()
const { Sequelize, Model } = require("sequelize")
const DB_URL = /*process.env.DATABASE_URL ||*/ 'postgres://localhost:5432/polling_app'

const pollDb = new Sequelize(DB_URL)


module.exports = pollDb