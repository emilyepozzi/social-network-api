const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactSchema = require("./Reactions");

const thtScheme = new Schema(
  {
    usrname: {
      type: String,
      required: true,
    },
    thoughtInfo: {
      type: String,
      required: true,
      min: 1,
      max: 150,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    reactions: [reactSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thtScheme.virtual("reactCnt").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thtScheme);
module.exports = Thought;
