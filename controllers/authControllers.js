const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const AppError = require("../utils/AppError");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user._id);
    res.status(201).json({ status: "success", token, data: user });
  } catch (err) {
    next(err)
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
   return next(new AppError("User does not exist",400))
  }
  const user = await User.findOne({ email });

  if (!user) {
   return next(new AppError("User not found", 401))
  }

  const correct = await user.correctPassword(password, user.password);

  if(!correct){
    return next(new AppError("Password not matched", 400))
  }

  const token = signToken(user._id);
  res.status(200).json({ status: "success", token, data: user });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
   return next(new AppError("You are not logged in", 403));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
     return next();
    }
  } catch (err) {
    next(err);
  }
};

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    let data = await User.findOne({ email });
    if (!data) {
      data = await User.create({
        name,
        email,
        photo: picture,
        googleId: email, //Password and confirm password are null here in case of google login
      });
    }

    const jwtToken = signToken(data?._id);
    res.json({ data, token: jwtToken });
  } catch (error) {
    console.error("Google authentication error:", error);
    next(new AppError("Google authentication failed", 401))
  }
};
