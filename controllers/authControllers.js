const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "442561328232-1pt2k7797vl0f04mvr9jh85e26k9ephe.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30s",
  });

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user._id);
    res.status(201).json({ status: "success", token, data: user });
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
    res
      .status(404)
      .json({ status: "No access", message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded !== null) {
      next();
    }
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", message: "Token expired or incorrect" });
  }
};

exports.googleLogin = async (req, res, next) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, photo: picture });
    }

    const jwtToken = signToken(user?._id);

    res.json({ user, token: jwtToken });
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(401).json({ error: "Google authentication failed" });
  }
};
