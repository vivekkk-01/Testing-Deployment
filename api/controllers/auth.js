const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  let error = validationResult(req);
  if (!error.isEmpty()) {
    error = new HttpError(error.array()[0].msg, 422);
    return next(error);
  }

  try {
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      error = new HttpError("User with that email address already exists", 422);
      return next(error);
    }

    const securedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: securedPassword,
    });
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let error;
    const isUser = await User.findOne({ email });
    if (!isUser) {
      error = new HttpError("User not found", 500);
      return next(error);
    }

    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      error = new HttpError("Enter a correct password", 500);
      return next(error);
    }

    const accessToken = jwt.sign({ id: isUser._id }, process.env.SECRET_KEY);
    return res.json({
      success: true,
      user: {
        accessToken,
        id: isUser._id,
        name: isUser.name,
        email: isUser.email,
        isAdmin: isUser.isAdmin,
      },
    });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};
