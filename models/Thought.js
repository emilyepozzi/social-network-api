const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')
const reactSchema = require('./Reactions')

const thoughtSchema = new Schema(
{
    usrname: {
        type: String,
        required: true
    },
    thoughtInfo: {
        type: String,
        required: true,
        min: 5,
        max: 350
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
}
)

module.exports = Thought;