const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    doctorId: {
      type: String,
      require: true,
    },
    userInfo: {
      type: Object,
      require: true,
    },
    doctorInfo: {
      type: Object,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "pending",
    },
    time: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
