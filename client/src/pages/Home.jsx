import { Row } from "antd";
import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import DoctorList from "../components/DoctorList";
import Layout from "../components/Layout";

const Home = () => {
  const data = useLoaderData();
  return (
    <Layout>
      <h1 className="text-center my-4">Home</h1>
      <Row>
        {data.map((doctor) => {
          return <DoctorList key={doctor._id} doctor={doctor} />;
        })}
      </Row>
    </Layout>
  );
};

export default Home;

export const loader = async () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (!userObj) {
    return redirect("/login");
  }
  const response = await fetch("http://localhost:8000/doctor", {
    headers: {
      authorization: `Bearer ${userObj.accessToken}`,
    },
  });
  return response;
};
