import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUserShield } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  console.log("admin layout", user);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ width: 200 }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg className="bi pe-none me-2" width="40" height="32"></svg>
          <span className="fs-4">Admin</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/admin/users"
              className="nav-link active"
              aria-current="page"
            >
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/contacts" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              Contacts
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>

      <Outlet />
    </>
  );
};

export default AdminLayout;
