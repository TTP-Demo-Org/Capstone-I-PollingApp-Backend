const { DataTypes } = require("sequelize")
const pollDb = require("../db")

const Option = pollDb.define("options", {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Option