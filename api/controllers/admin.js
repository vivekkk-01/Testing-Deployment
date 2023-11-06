const Doctor = require("../models/Doctor");
const HttpError = require("../models/http-error");
const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false });
    return res.json({ success: true, users });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    return res.json({ success: true, doctors });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.putDoctor = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const { status } = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, { status });
    const user = await User.findOne({ _id: updatedDoctor.userId });
    user.notifications.push({
      type: "doctor-account-request-update",
      message: `Your Doctor Account request is ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    return res.json({
      success: true,
      doctor: updatedDoctor,
      message: "Account status updated",
    });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};
