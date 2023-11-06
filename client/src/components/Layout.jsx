import React, { useEffect, useState } from "react";
import classes from "./layout.module.css";
import { adminMenu, userMenu } from "../data/data";
import { NavLink, Link } from "react-router-dom";
import { Badge } from "antd";
import axios from "axios";

const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [sideBarMenu, setSideBarMenu] = useState(userMenu);
  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  useEffect(() => {
    if (currentUser) {
      (async () => {
        const response = await axios.get("/user/" + currentUser.id, {
          headers: {
            authorization: `Bearer ${currentUser.accessToken}`,
          },
        });
        setCurrentUser(response.data);
      })();
    }
  }, []);

  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${currentUser?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  useEffect(() => {
    setSideBarMenu(
      currentUser?.isAdmin
        ? adminMenu
        : currentUser?.isDoctor
        ? doctorMenu
        : userMenu
    );
  }, [currentUser]);

  return (
    <div className={classes.main}>
      <div className={classes.layout}>
        <div className={classes.sidebar}>
          <div className={classes.logo}>
            <h6>DOC App</h6>
            <hr />
          </div>
          <div className={classes.menu}>
            {sideBarMenu.map((item) => {
              return (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.active} ${classes.menuItem}`
                      : classes.menuItem
                  }
                  key={item.path}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
            <button
              onClick={logoutHandler}
              style={{ border: "none", outline: "none" }}
              className={classes.menuItem}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.header}>
            <div className={classes.headerContent}>
              <Link className="text-black" to="/notifications">
                <i className="fa-solid fa-bell">
                  <Badge
                    className={classes.badge}
                    count={currentUser?.notifications?.length}
                    size="small"
                  ></Badge>
                </i>
              </Link>
              <Link to="/profile">{currentUser?.name}</Link>
            </div>
          </div>
          <div className={classes.body}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
