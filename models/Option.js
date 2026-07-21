const { DataTypes } = require("sequelize")
const pollDb = require("../db")

const Option = pollDb.define("Option", {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Option
