import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import moment from "moment";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import "./applyDoctor.css";
import { CircularProgress } from "@material-ui/core";

const ApplyDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    const data = {
      ...values,
      timings: {
        from: moment(new Date(values["Work hours"][0])).format("HH:mm"),
        to: moment(new Date(values["Work hours"][1])).format("HH:mm"),
      },
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/user/apply-doctor",
        { ...data, userId: currentUser.id },
        {
          headers: {
            authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        message.success({
          type: "success",
          duration: 3,
          content: "Registration successfull!",
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
      message.error({
        type: "error",
        content: err.response.data.message,
        duration: 3,
      });
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-center my-3">Apply Doctor</h1>
      <Form layout="vertical" className="m-3" onFinish={submitHandler}>
        <h4>Personal Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="First Name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your first name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="Last Name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your last name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="Email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Your email" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="Address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your address" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="Phone Number"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your phone number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="Website">
              <Input type="text" placeholder="Your website" />
            </Form.Item>
          </Col>
        </Row>

        <h4>Professional Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="Specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your specialization" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="Experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your experience" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees per consultation"
              name="Fees"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your fees" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="Work hours"
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              {isLoading ? (
                <CircularProgress size="18px" style={{ color: "white" }} />
              ) : (
                "Submit"
              )}
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;

export const loader = () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (!userObj) {
    return redirect("/login");
  }
  return null;
};
