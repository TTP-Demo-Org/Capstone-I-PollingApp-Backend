const Option = require("./Option")
const Poll = require("./Poll")
const Vote = require("./Vote")

Poll.hasMany(Option)
Option.belongsTo(Poll)

Option.hasMany(Vote)
Vote.belongsTo(Option)

module.exports = {Option, Poll, Vote}