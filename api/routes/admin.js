const routes = require("express").Router();
const verifyToken = require("../verifyToken");

const adminControllers = require("../controllers/admin");

routes.get("/users", verifyToken, adminControllers.getUsers);

routes.get("/doctors", verifyToken, adminControllers.getDoctors);

routes.put(
  "/doctors-notification/:doctorId",
  verifyToken,
  adminControllers.putDoctor
);

module.exports = routes;
