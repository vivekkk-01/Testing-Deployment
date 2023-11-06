const routes = require("express").Router();

const userControllers = require("../controllers/user");
const verifyToken = require("../verifyToken");

routes.post("/apply-doctor", verifyToken, userControllers.postApplyDoctor);

routes.get("/:userId", verifyToken, userControllers.getUser);

routes.get(
  "/notifications/:userId",
  verifyToken,
  userControllers.getNotifications
);

routes.delete(
  "/notifications/:userId",
  verifyToken,
  userControllers.deleteNotifications
);

routes.post("/appointment", verifyToken, userControllers.postAppointment);

routes.post(
  "/check-appointment",
  verifyToken,
  userControllers.postCheckAppointment
);

routes.get(
  "/appointments/:userId",
  verifyToken,
  userControllers.getAppointments
);

module.exports = routes;
