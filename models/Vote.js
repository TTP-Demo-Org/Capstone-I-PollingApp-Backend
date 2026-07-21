const { DataTypes } = require("sequelize")
const pollDb = require("../db")

const Vote = pollDb.define("votes" , {})

module.exports = Vote