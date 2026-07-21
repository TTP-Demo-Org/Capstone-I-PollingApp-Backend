const { DataTypes } = require("sequelize")
const pollDb = require("../db")

const Poll = pollDb.define("Poll", {
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
    }
})

module.exports = Poll
