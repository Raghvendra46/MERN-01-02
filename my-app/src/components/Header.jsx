import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user => ", user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      {user ? (
        <div>
          <h3>&nbsp; Hi, {user.firstName}</h3>
          <Link to="/">Welcome</Link> |&nbsp;
          <Link to="/userList">User List</Link> |&nbsp;
          <Link to="/addUser">Add User</Link> |&nbsp;
          <Link to="/studentList">Student List</Link> |&nbsp;
          <Link to="/addStudent">Add Student</Link> |&nbsp;
          <Link to="/marksheetList">Marksheet List</Link> |&nbsp;
          <Link to="/addMarksheet">Add Marksheet</Link> |&nbsp;
          <Link to="#" onClick={logout}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <h3>&nbsp; Hi, Guest</h3>
          <Link to="/">Welcome</Link> |&nbsp;
          <Link to="/signUp">Sign Up</Link> |&nbsp;
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
