const Doctor = require("../models/Doctor");
const HttpError = require("../models/http-error");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.getDoctor = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const doctor = await Doctor.findOne({ userId });
    const data = {
      Address: doctor.address,
      Email: doctor.email,
      Experience: doctor.experience,
      Fees: Number(doctor.feePerConsultation),
      Website: doctor.website,
      Specialization: doctor.specialization,
      "Phone Number": doctor.phone,
      "First Name": doctor.firstName,
      "Last Name": doctor.lastName,
      timings: doctor.timings,
      userId: doctor.userId,
    };
    return res.json(data);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.putDoctor = async (req, res, next) => {
  const userId = req.params.userId;
  try {
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

    let doctor = await Doctor.findOneAndUpdate({ userId }, data);
    await doctor.save();
    return res.json({ doctor, success: true });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    return res.json(doctors);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.getSingleDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    return res.json(doctor);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.params.userId });
    const appointments = await Appointment.find({
      doctorId: doctor._id,
    });
    return res.json(appointments);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

exports.putStatus = async (req, res, next) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findOneAndUpdate(appointmentId, {
      status,
    });
    const user = await User.findById(appointment.userId);
    user.notifications.push({
      message: `Your appointment has been ${status} by ${appointment.doctorInfo.firstName} ${appointment.doctorInfo.lastName}`,
    });
    await user.save();
    return res.json({ success: true, message: `Appointment ${status}` });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};
