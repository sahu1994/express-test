const moongose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = moongose.Schema;

const User = new Schema({
  name: { type: String, required: [true, "Please tell your name"] },
  email: {
    type: String,
    required: [true, "Please tell your email"],
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Only required if not signing up via Google
    },
    minlength: 6,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  photo: { type: String },
});

User.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  this.passwordConfirm = undefined;
  next();
});

User.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = moongose.model("User", User);
