import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const { storeTokenInLS, API } = useAuth();

  const URL = `${API}/api/auth/login`;

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
        setUser({ email: "", password: "" });
        toast.success("Login Successful");
        navigate("/home");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="m-auto w-50">
        <div>
          <h2>Login Here</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={user.email}
              onChange={handleForm}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={user.password}
              onChange={handleForm}
            />
          </div>
          <div>
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
