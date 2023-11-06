import { CircularProgress } from "@material-ui/core";
import { Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Profile = () => {
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const doctor = { ...data };
  const submitHandler = async (values) => {
    const data = {
      ...values,
      timings: doctor.timings,
    };
    setIsLoading(true);
    try {
      const response = await axios.put(
        "/doctor/" + currentUser.id,
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
          content: "Profile updated!",
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
      <h2 className="my-5 text-center">Manage Profile</h2>
      <Form
        layout="vertical"
        className="m-3"
        onFinish={submitHandler}
        initialValues={doctor}
      >
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
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              {isLoading ? (
                <CircularProgress size="18px" style={{ color: "white" }} />
              ) : (
                "Update"
              )}
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default Profile;

export const loader = async ({ params }) => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (!userObj) {
    return redirect("/login");
  }
  const doctorId = params.doctorId;
  const response = await fetch("http://localhost:8000/doctor/" + doctorId, {
    headers: {
      authorization: `Bearer ${userObj.accessToken}`,
    },
  });

  return await response.json();
};
