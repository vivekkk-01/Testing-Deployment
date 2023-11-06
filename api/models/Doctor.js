const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    userId: String,
    firstName: { type: String, require: [true, "First Name is require"] },
    lastName: { type: String, require: [true, "Last Name is require"] },
    phone: { type: String, require: [true, "Phone number is require"] },
    email: { type: String, require: [true, "Email is require"] },
    website: { type: String },
    address: { type: String, require: [true, "Address is require"] },
    specialization: {
      type: String,
      require: [true, "Specialization is require"],
    },
    experience: { type: String, require: [true, "Experience is require"] },
    feePerConsultation: { type: Number, require: [true, "Fee is require"] },
    timings: { type: Object, require: [true, "Work time is require"] },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
