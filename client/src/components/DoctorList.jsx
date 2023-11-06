import React from "react";
import { Link } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={`/book-appointment/${doctor._id}`}
      className="card m-4"
    >
      <div className="card-header">
        <b>
          Dr. {doctor.firstName} {doctor.lastName}
        </b>
      </div>
      <div className="card-body">
        <p>
          Specialization <b>{doctor.specialization}</b>
        </p>
        <p>
          Experience <b>{doctor.experience}</b>
        </p>
        <p>
          Fee per consultaion <b>{doctor.feePerConsultation}</b>
        </p>
        <p>
          Work hours{" "}
          <b>
            {doctor.timings.from} - {doctor.timings.to}
          </b>
        </p>
      </div>
    </Link>
  );
};

export default DoctorList;
