const Doctor = require("../models/Doctor");
const User = require("../models/User");
const HttpError = require("../models/http-error");
const Appointment = require("../models/Appointment");
const moment = require("moment");

exports.postApplyDoctor = async (req, res, next) => {
  const data = {
    address: req.body.Address,
    email: req.body.Email,
    experience: req.body.Experience,
    feePerConsultation: Number(req.body.Fees),
    website: req.body.Website,
    specialization: req.body.Specialization,
    phone: req.body["Phone Number"],
    firstName: req.body["First Name"],
    lastName: req.body["Last Name"],
    timings: req.body.timings,
    userId: req.body.userId,
  };
  try {
    const newDoctor = new Doctor({ ...data });
    await newDoctor.save();

    const admin = await User.findOne({ isAdmin: true });
    const notifications = admin.notifications;
    notifications.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
        clickPath: "/admin/doctors",
      },
    });

    await User.findByIdAndUpdate(admin._id, { notifications });
    return res.json({ success: true });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.json(user);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const notifications = user.notifications;
    const seenNotifications = user.seenNotifications;
    user.notifications = [];
    seenNotifications.push(...notifications);
    user.seenNotifications = seenNotifications;
    await user.save();
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.deleteNotifications = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    user.notifications = [];
    user.seenNotifications = [];
    await user.save();
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.postAppointment = async (req, res, next) => {
  req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
  req.body.time = moment(req.body.time, "HH:mm").toISOString();
  try {
    req.body.status = "pending";
    const appointement = new Appointment({ ...req.body });
    await appointement.save();
    const doctor = await User.findOne({ _id: req.body.doctorInfo.userId });
    doctor.notifications.push({
      message: `A new appointment request from ${req.body.userInfo.name}`,
      clickPath: "/user/appointments",
    });
    await doctor.save();
    return res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.postCheckAppointment = async (req, res, next) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.json({
        success: false,
        message: "Appointments are not available at this time",
      });
    } else {
      return res.json({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId });
    return res.json(appointments);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};
