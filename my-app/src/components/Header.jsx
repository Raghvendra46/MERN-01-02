import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user => ", user);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post("http://localhost:3000/user/logout")
      .then((response) => {
        localStorage.removeItem("user");
        console.log("message: ", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error fetching users: ", error.message);
      });
  };

  return (
    <nav>
      <div>
        {user ? (
          <>
            <h3>&nbsp; Hi, {user.firstName}</h3>
            <>
              {user.role === "User" ? (
                <>
                  <Link to="/">Welcome</Link> |&nbsp;
                  <Link to="/userList">User List</Link> |&nbsp;
                  <Link to="/addUser">Add User</Link> |&nbsp;
                  <Link to="/studentList">Student List</Link> |&nbsp;
                  <Link to="/addStudent">Add Student</Link> |&nbsp;
                  <Link to="/marksheetList">Marksheet List</Link> |&nbsp;
                  <Link to="/addMarksheet">Add Marksheet</Link> |&nbsp;
                </>
              ) : (
                <>
                  <Link to="/marksheetList">Marksheet List</Link> |&nbsp;
                </>
              )}

              <Link to="#" onClick={logout}>
                Logout
              </Link>
            </>
          </>
        ) : (
          <div>
            <h3>&nbsp; Hi, Guest</h3>
            <Link to="/">Welcome</Link> |&nbsp;
            <Link to="/signUp">Sign Up</Link> |&nbsp;
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
      <br />
      <hr />
    </nav>
  );
};

export default Header;
