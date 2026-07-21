const { DataTypes } = require("sequelize")
const pollDb = require("../db")

const Poll = pollDb.define("polls" , {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
    }
})

module.exports = Poll