import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    loginId: "",
    password: "",
    dob: "",
    gender: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("First Name => ", formData.firstName);
    console.log("Last Name => ", formData.lastName);
    console.log("Login ID => ", formData.loginId);
    console.log("DOB => ", formData.dob);
    console.log("Gender => ", formData.gender);
  };

  const SignUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/user/signUp", formData)
      .then((response) => {
        console.log("response => ", response.data);
      })
      .catch((error) => {
        console.log("error: ", error.message);
      });
  };

  return (
    <div>
      <h1 align="center">User Registration</h1>
      <form onSubmit={SignUp}>
        <table align="center">
          <tr>
            <th>FirstName:</th>
            <td>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Enter First Name"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>LastName:</th>
            <td>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Enter Last Name"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>LoginId:</th>
            <td>
              <input
                type="email"
                name="loginId"
                value={formData.loginId}
                placeholder="Enter Email Id"
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
            <th>DOB:</th>
            <td>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Gender:</th>
            <td>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <input type="submit" value="SingUp" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default SignUp;
