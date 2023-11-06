const routes = require("express").Router();

const verifyToken = require("../verifyToken");

const doctorControllers = require("../controllers/doctor");

routes.get("/:userId", verifyToken, doctorControllers.getDoctor);

routes.put("/status", verifyToken, doctorControllers.putStatus);

routes.put("/:userId", verifyToken, doctorControllers.putDoctor);

routes.get("/", verifyToken, doctorControllers.getDoctors);

routes.get("/single/:doctorId", verifyToken, doctorControllers.getSingleDoctor);

routes.get(
  "/appointments/:userId",
  verifyToken,
  doctorControllers.getAppointments
);

module.exports = routes;
