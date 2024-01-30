import React, { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = { email: "", password: "", message: "" };

const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);
  const { user, API } = useAuth();

  const URL = `${API}/api/form/contact`;
  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
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
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        alert("message Sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="m-auto w-50">
        <div>
          <h2>Contact Here</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              value={contact.username}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="password"
              className="form-control"
              placeholder="name@example.com"
              value={contact.email}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="3"
              value={contact.message}
              onChange={handleInput}
            ></textarea>
          </div>
          <div>
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
