import { DatePicker, message, TimePicker } from "antd";
import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import Layout from "../components/Layout";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

import axios from "axios";

const Booking = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userInfo = {
    name: currentUser.name,
    email: currentUser.email,
    id: currentUser.id,
  };
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoadindg] = useState(false);

  const doctor = useLoaderData();

  const handleAvailability = async () => {
    if (!time || !date) {
      return alert("Date & Time required.");
    }
    setIsLoadindg(true);
    try {
      const response = await axios.post(
        "/user/check-appointment",
        {
          doctorId: doctor._id,
          time,
          date,
        },
        {
          headers: {
            authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setIsAvailable(true);
        setIsLoadindg(false);
        message.success({
          type: "success",
          duration: 3,
          content: response.data.message,
        });
      } else {
        setIsLoadindg(false);
        message.error({
          type: "error",
          duration: 3,
          content: response.data.message,
        });
      }
    } catch (err) {
      setIsLoadindg(false);
      message.error({
        type: "error",
        duration: 3,
        content: err.message,
      });
    }
  };

  const handleBooking = async () => {
    if (!time || !date) {
      return alert("Date & Time required.");
    }
    setIsLoadindg(true);
    try {
      setIsAvailable(true);
      const response = await axios.post(
        "/user/appointment",
        {
          doctorId: doctor._id,
          userId: currentUser.id,
          doctorInfo: doctor,
          userInfo,
          time,
          date,
        },
        {
          headers: {
            authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setIsLoadindg(false);
        message.success({
          type: "success",
          duration: 3,
          content: response.data.message,
        });
      } else {
        setIsLoadindg(false);
        message.error({
          type: "error",
          duration: 3,
          content: response.data.message,
        });
      }
    } catch (err) {
      setIsLoadindg(false);
      message.error({
        type: "error",
        duration: 3,
        content: err.message,
      });
    }
  };
  return (
    <Layout>
      <h2 className="text-center my-4">Booking Page</h2>
      <div className="container m-2">
        <h4>
          Dr. {doctor.firstName} {doctor.lastName}
        </h4>
        <h4>
          Work hours : {doctor.timings.from} - {doctor.timings.to}
        </h4>
        <div className="d-flex flex-column w-50">
          <DatePicker
            className="mt-2"
            format="DD-MM-YYYY"
            onChange={(value) =>
              setDate(moment(new Date(value)).format("DD-MM-YYYY"))
            }
          />
          <TimePicker
            className="mt-2"
            format="HH:mm"
            onChange={(value) =>
              setTime(moment(new Date(value)).format("HH:mm"))
            }
          />
          <button className="btn btn-primary mt-2" onClick={handleAvailability}>
            {isLoading ? (
              <CircularProgress size="17px" style={{ color: "white" }} />
            ) : (
              "Check Availability"
            )}
          </button>
          {isAvailable && (
            <button className="btn btn-dark mt-2" onClick={handleBooking}>
              {isLoading ? (
                <CircularProgress size="17px" style={{ color: "white" }} />
              ) : (
                "Book Now"
              )}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Booking;

export const loader = async ({ params }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    return redirect("/login");
  }
  const response = await fetch(
    "https://my-first-app-tsip.onrender.com/doctor/single/" + params.doctorId,
    {
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    }
  );
  return response;
};
