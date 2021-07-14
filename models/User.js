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
      required: "Place in your user name.",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Place in your email. ",
      validate: [validateEmail, "Place in a working email."],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Place in a working email",
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
