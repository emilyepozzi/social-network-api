const { Schema, model } = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const UserSchema = new Schema(
  {
    usrname: {
      type: String,
      unique: true,
      required: "Please place in username.",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Please give email. ",
      validate: [validateEmail, "Please submit a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please submit a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCnt").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
