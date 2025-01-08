import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true; // Accept session and cookies provide by backend server

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    firstName: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const fetchUsers = (query = {}) => {
    const queryString = new URLSearchParams(query).toString();

    axios
      .get(`http://localhost:3000/user/search?${queryString}`)
      .then((response) => {
        if (response.status === 401) {
          setIsAuthenticated(false);
        } else {
          setUserList(response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching users: ", error.message);
        setIsAuthenticated(false);
      });
  };

  const deleteUser = (id) => {
    if (window.confirm("Confirm User Deletion?")) {
      axios
        .post(`http://localhost:3000/user/delete/${id}`)
        .then(() => {
          alert("User has been deleted successfully");
          fetchUsers();
        })
        .catch((error) => {
          console.log("Error deleting user: ", error.message);
          alert("Unable to delete user, try again later");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!isAuthenticated) {
    return (
      <div align="center">
        <br />
        <h3 color="red">You are not authorized to access this page.</h3>
      </div>
    );
  }

  const handleSearchClick = () => {
    fetchUsers(searchQuery);
  };

  return (
    <div>
      <br />
      <table>
        <tbody>
          <tr>
            First Name:
            <td>
              <input
                type="text"
                name="firstName"
                value={searchQuery.firstName}
                placeholder="Enter First Name"
                onChange={handleChange}
              />
            </td>
            <td>
              <button onClick={handleSearchClick}>search</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
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
            <th>Actions</th>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id} align="center">
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.loginId}</td>
                <td>{new Date(user.dob).toLocaleDateString()}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/editUser/${user._id}`}>
                    <button>Edit</button>
                  </Link>
                  &nbsp;
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default UserList;
