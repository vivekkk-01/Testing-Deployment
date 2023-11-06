import React, { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import "./register.css";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/auth/login", values);
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        message.success({
          type: "success",
          duration: 3,
          content: "Login successfull!",
        });
        navigate("/");
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
      setIsLoading(false);
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
        <h3 className="text-center">Login Form</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>

        <Link className="m-2" to="/register" style={{ textDecoration: "none" }}>
          Don't have an account?
        </Link>
        <button className="btn btn-primary" type="submit">
          {isLoading ? (
            <CircularProgress size="17px" style={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </button>
      </Form>
    </div>
  );
};

export default Login;

export const loader = () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (userObj) {
    return redirect("/");
  }
  return null;
};
