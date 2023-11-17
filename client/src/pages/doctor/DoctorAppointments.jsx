import { Table, message } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import Layout from "../../components/Layout";
import axios from "axios";

const DoctorAppointments = () => {
  const [isChange, setIsChange] = useState(false);
  const appointments = useLoaderData();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const columns = [
    { title: "Id", dataIndex: "_id" },
    {
      title: "Name",
      render: (text, record) => {
        return <span>{record.userInfo.name}</span>;
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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="d-flex">
            <button
              className="btn btn-success me-1"
              onClick={async () => {
                setIsChange((prev) => !prev);
                record.status = "approved";
                const response = await axios.put(
                  "/doctor/status",
                  {
                    appointmentId: record._id,
                    status: "approved",
                  },
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
                    content: response.data.message,
                  });
                } else {
                  message.error({
                    type: "error",
                    duration: 3,
                    content: response.data.message,
                  });
                }
              }}
            >
              Approve
            </button>
            <button
              className="btn btn-danger"
              onClick={async () => {
                setIsChange((prev) => !prev);
                record.status = "rejected";
                const response = await axios.put(
                  "/doctor/status",
                  {
                    appointmentId: record._id,
                    status: "rejected",
                  },
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
                    content: response.data.message,
                  });
                } else {
                  message.error({
                    type: "error",
                    duration: 3,
                    content: response.data.message,
                  });
                }
              }}
            >
              Reject
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <h1 className="my-4 text-center">Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;

export const loader = async () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    return redirect("/login");
  }
  const response = await fetch(
    "https://my-first-app-tsip.onrender.com/doctor/appointments/" + currentUser.id,
    {
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    }
  );
  return response;
};
