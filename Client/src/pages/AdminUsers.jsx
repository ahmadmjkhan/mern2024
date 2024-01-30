import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUser] = useState([]);
  const { authorizationToken, API } = useAuth();
  const URL = `${API}/api/admin/users`;

  const gettAllUserData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      setUser(data);
      console.log(`users ${data}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users after delete: ${data}`);
      if (response.ok) {
        gettAllUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettAllUserData();
  }, []);
  return (
    <>
      <table className="table table-dark table-hover w-50">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((curElem, index) => {
            return (
              <tr key={index}>
                <td>{curElem.username}</td>
                <td>{curElem.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(curElem._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/admin/users/${curElem._id}/edit`}>Edit</Link>
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

export default AdminUsers;
