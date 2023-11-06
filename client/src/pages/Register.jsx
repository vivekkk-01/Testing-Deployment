import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, redirect, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/auth/register", values);
      if (response.data.success) {
        message.success({
          type: "success",
          duration: 3,
          content: "Signup successfull!",
        });
        navigate("/login");
        setIsLoading(false);
        return;
      } else {
        message.error({
          type: "error",
          content: response.data.message,
          duration: 3,
        });
        setIsLoading(false);
      }
    } catch (err) {
      message.error({
        type: "error",
        content: err.response.data.message,
        duration: 3,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={submitHandler}
        className="register-form p-4"
      >
        <h3 className="text-center">Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>

        <button className="btn btn-primary" type="submit">
          {isLoading ? (
            <CircularProgress size="17px" style={{ color: "white" }} />
          ) : (
            "Register"
          )}
        </button>
        <Link className="m-2" to="/login" style={{ textDecoration: "none" }}>
          Already a user?
        </Link>
      </Form>
    </div>
  );
};

export default Register;

export const loader = () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (userObj) {
    return redirect("/");
  }
  return null;
};
