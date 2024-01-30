import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS, API } = useAuth();

  const URL = `${API}/api/auth/register`;

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res from server", res_data);

      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
      } else {
        alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      console.log(response);
    } catch (error) {
      console.log("Created", error);
    }
  };
  return (
    <>
      <div className="m-auto w-50">
        <div className="text-center">
          <h2>Signup Here</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="name@example.com"
              value={user.username}
              onChange={handleForm}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              value={user.email}
              onChange={handleForm}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="name@example.com"
              value={user.phone}
              onChange={handleForm}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="name@example.com"
              value={user.password}
              onChange={handleForm}
            />
          </div>
          <div>
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
