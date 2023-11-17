import { Table } from "antd";
import moment from "moment";
import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import Layout from "../components/Layout";

const Appointments = () => {
  const appointments = useLoaderData();
  const columns = [
    { title: "Id", dataIndex: "_id" },
    {
      title: "Name",
      render: (text, record) => {
        return (
          <span>
            {record.doctorInfo.firstName} {record.doctorInfo.lastName}
          </span>
        );
      },
    },
    {
      title: "Date & Time",
      render: (text, record) => {
        return (
          <span>
            {moment(record.date).format("DD-MM-YYYY")} &nbsp;{" "}
            {moment(record.time).format("HH:mm")}
          </span>
        );
      },
    },
    { title: "Status", dataIndex: "status" },
  ];

  return (
    <Layout>
      <h1 className="my-4 text-center">Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;

export const loader = async () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    return redirect("/login");
  }
  const response = await fetch(
    "https://my-first-app-tsip.onrender.com/user/appointments/" + currentUser.id,
    {
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    }
  );
  return response;
};
