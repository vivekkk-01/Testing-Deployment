import { CircularProgress } from "@material-ui/core";
import { message, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import Layout from "../components/Layout";

const Notifications = () => {
  const data = useLoaderData().data;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState(data.notifications);
  const [seenNotifications, setSeenNotifications] = useState(
    data.seenNotifications
  );

  const [isLoading, setIsLoading] = useState(false);

  const markHandler = async () => {
    if (notifications.length === 0) {
      return;
    }
    setIsLoading(true);
    const response = await axios("/user/notifications/" + data._id, {
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    });
    if (response.data.success) {
      message.success({
        type: "success",
        duration: 3,
        content: "All notifications marked as read",
      });
      setIsLoading(false);
      setSeenNotifications((prev) => [...prev, ...notifications]);
      setNotifications([]);
      return;
    } else {
      message.error({
        type: "error",
        content: response.data.message,
        duration: 3,
      });
      setIsLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (seenNotifications.length === 0) {
      return;
    }
    setIsLoading(true);
    const response = await axios.delete("/user/notifications/" + data._id, {
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    });
    if (response.data.success) {
      message.success({
        type: "success",
        duration: 3,
        content: "All notifications deleted successfully",
      });
      setIsLoading(false);
      setSeenNotifications([]);
      return;
    } else {
      message.error({
        type: "error",
        content: response.data.message,
        duration: 3,
      });
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h3 className="p-3 text-center">Notifications Page</h3>
      <Tabs className="p-2">
        <TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <button
              disabled={isLoading}
              className="btn btn-success m-3 p-2 w-25"
              onClick={markHandler}
            >
              {isLoading ? (
                <CircularProgress
                  size="20px"
                  style={{ color: "white", cursor: "pointer" }}
                />
              ) : (
                "Mark As Read"
              )}
            </button>
          </div>
          {notifications.map((notification, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-text">{notification.message}</div>
              </div>
            );
          })}
        </TabPane>

        <TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <button
              disabled={isLoading}
              className="btn btn-danger m-3 p-2 w-25"
              onClick={deleteHandler}
            >
              {isLoading ? (
                <CircularProgress
                  size="20px"
                  style={{ color: "white", cursor: "pointer" }}
                />
              ) : (
                "Delete all notifications"
              )}
            </button>
          </div>
          {seenNotifications.map((seeNotification) => {
            return (
              <div className="card" key={seeNotification.message}>
                <div className="card-text">{seeNotification.message}</div>
              </div>
            );
          })}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;

export const loader = async () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  if (!userObj) {
    return redirect("/login");
  }
  const response = await axios.get("/user/" + userObj.id, {
    headers: {
      authorization: `Bearer ${userObj.accessToken}`,
    },
  });

  return response;
};
