const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    res.status(201).json({ status: "success", token, data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ status: "fail", message: "User does not exist" });
  }
  const user = await User.findOne({ email });
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    res.status(401).json({ status: "fail", message: "Login failed" });
  }

  const token = signToken(user._id);
  res.status(200).json({ status: "success", token });
};

//This function verifies jwt token
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //check if token exists
  if (!token) {
    res
      .status(404)
      .json({ status: "No access", message: "You are not logged in" });
  }

  //Verification token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Grant access to the protected route
    if (decoded !== null) {
      next();
    }
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", message: "Token expired or incorrect" });
  }
};
