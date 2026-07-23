  const { DataTypes } = require("sequelize");
  const pollDb = require("../db");

  const Vote = pollDb.define("Vote", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  module.exports = Vote