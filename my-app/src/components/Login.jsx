import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Login ID => ", formData.loginId);
  };

  const Login = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/user/login", formData)
    .then((response) => {
      console.log("response => ", response.data);
    })
    .catch((error) => {
      console.log("error: ", error.message);
    })
  }

  return (
    <div>
      <h1 align="center">User Login</h1>
      <form onSubmit={Login}>
        <table align="center">
          <tr>
            <th>LoginId:</th>
            <td>
              <input
                type="email"
                name="loginId"
                value={formData.loginId}
                placeholder="Enter Email ID"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th></th>
            <td><input type="submit" value="Login" /></td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Login;
