import { Table } from "antd";
import { redirect, useLoaderData } from "react-router-dom";
import Layout from "../../components/Layout";

const Users = () => {
  const data = useLoaderData();
  const users = data.users;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => {
        return <span>{record.isDoctor ? "Yes" : "No"}</span>;
      },
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="d-flex">
            <button className="btn btn-danger">Block</button>
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
      <h1>Users</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;

export const loader = async () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (!userObj) {
    return redirect("/login");
  }
  const response = await fetch("https://my-first-app-tsip.onrender.com/admin/users", {
    headers: {
      authorization: `Bearer ${userObj.accessToken}`,
    },
  });
  return await response.json();
};
