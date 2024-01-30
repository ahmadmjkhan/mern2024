import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

const AdminContacts = () => {
  const [contact, setContact] = useState([]);
  const { authorizationToken, API } = useAuth();
  const URL = `${API}/api/admin/contacts`;

  const gettAllContactData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      setContact(data);
      console.log(`contact ${data}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`contact after delete: ${data}`);
      if (response.ok) {
        gettAllContactData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettAllContactData();
  }, []);
  return (
    <>
      <table className="table table-dark table-hover w-50">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contact.map((curElem, index) => {
            return (
              <tr key={index}>
                <td>{curElem.username}</td>
                <td>{curElem.email}</td>
                <td>{curElem.message}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteContact(curElem._id)}
                  >
                    Delete
                  </button>
                  <input type="submit" className="btn btn-info" value="Edit" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      ;
    </>
  );
};

export default AdminContacts;
