const Option = require("./Option")
const Poll = require("./Poll")
const Vote = require("./Vote")

Poll.hasMany(Option, { foreignKey: "pollId" })
Option.belongsTo(Poll, { foreignKey: "pollId" })

Option.hasMany(Vote, { foreignKey: "optionId" })
Vote.belongsTo(Option, { foreignKey: "optionId" })

module.exports = { Option, Poll, Vote }
