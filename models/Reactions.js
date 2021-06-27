const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const reactionSchema = new Schema({
    usrname: {
        type: String,
        required: true
    },
    reactId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactBody: {
        type: String,
        required: true,
        maxLength: 350
    },

});

module.exports = reactionSchema;