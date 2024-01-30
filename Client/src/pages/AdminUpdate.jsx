import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  console.log("params SIngle User", params);
  const { authorizationToken, API } = useAuth();

  const URL = `${API}/api/admin/users`;
  //get single User data//
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`${URL}/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Single User Data ${data}}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <>
        <div className="m-auto w-50">
          <div className="text-center">
            <h2>Update Users</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="name@example.com"
                value={data.username}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={data.email}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="name@example.com"
                value={data.phone}
                onChange={handleInput}
              />
            </div>

            <div>
              <input type="submit" value="Update" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default AdminUpdate;
