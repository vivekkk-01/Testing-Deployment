const routes = require("express").Router();
const { body } = require("express-validator");

const authControllers = require("../controllers/auth");

routes.post(
  "/register",
  [
    body("name").trim().not().isEmpty().withMessage("Name should not be empty"),
    body("email").trim().isEmail().withMessage("Enter a valid email address"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password should contain atleast 8 characters"),
  ],
  authControllers.postRegister
);

routes.post("/login", authControllers.postLogin);

module.exports = routes;
