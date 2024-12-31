import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/search")
      .then((response) => {
        console.log("data => ", response.data);
        setUserList(response.data);
      })
      .catch((error) => {
        console.log("Error fetching users: ", error.message);
      });
  }, []);

  return (
    <form>
      <br />
      <table align="center" border={1} width="100%">
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Login ID</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>Role</th>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user._id} align="center">
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.loginId}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default UserList;
