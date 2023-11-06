import { message, Table } from "antd";
import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import Layout from "../../components/Layout";

const Doctors = () => {
  const [status, setStatus] = useState(null);
  const doctors = useLoaderData().doctors;
  const userObj = JSON.parse(localStorage.getItem("user"));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <span>
            {record.firstName} {record.lastName}
          </span>
        );
      },
    },
    { title: "Status", dataIndex: "status" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        setStatus(record.status);
        return (
          <div className="d-flex">
            {record.status === "pending" || record.status === "rejected" ? (
              <button
                className="btn btn-success"
                onClick={async () => {
                  setStatus("approved");
                  record.status = "approved";
                  const response = await fetch(
                    "http://localhost:8000/admin/doctors-notification/" +
                      record._id,
                    {
                      method: "PUT",
                      headers: {
                        authorization: `Bearer ${userObj.accessToken}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        status: "approved",
                      }),
                    }
                  );
                }}
              >
                Approve
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={async () => {
                  setStatus("rejected");
                  record.status = "rejected";
                  const response = await fetch(
                    "http://localhost:8000/admin/doctors-notification/" +
                      record._id,
                    {
                      method: "PUT",
                      headers: {
                        authorization: `Bearer ${userObj.accessToken}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        status: "rejected",
                      }),
                    }
                  );
                }}
              >
                Reject
              </button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
      <h1>Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;

export const loader = async () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (!userObj) {
    return redirect("/login");
  }
  const response = await fetch("http://localhost:8000/admin/doctors", {
    headers: {
      authorization: `Bearer ${userObj.accessToken}`,
    },
  });
  return await response.json();
};
