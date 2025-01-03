import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    loginId: "",
    password: "",
    dob: "",
    gender: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/user/getUserById/${id}`)
        .then((response) => {
          const userData = response.data;
          const formattedDob = new Date(userData.dob)
            .toISOString()
            .split("T")[0];
          setFormData({ ...userData, dob: formattedDob });
        })
        .catch((error) => {
          console.log("Error in fetching User: ", error.message);
        });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (!isNaN(formData.firstName)) {
      newErrors.firstName = "First Name should only include letters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (!isNaN(formData.lastName)) {
      newErrors.lastName = "Last Name should only include letters";
    }

    if (!formData.loginId.trim()) {
      newErrors.loginId = "Login ID is required";
    } else if (
      !formData.loginId.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ) {
      newErrors.loginId = "Login ID format is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!formData.password.match(/^(?=.*\d)(?=.*[^\w\d\s]).*$/i)) {
      newErrors.password =
        "Password must contain a number and a special character";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const url = id
      ? `http://localhost:3000/user/update/${id}`
      : "http://localhost:3000/user/save";

    axios
      .post(url, formData)
      .then((response) => {
        setMessage(
          response.data.error ? response.data.error : response.data.message
        );
        console.log("response => ", response.data);
      })
      .catch((error) => {
        setMessage("An error occurred.");
        console.log("error: ", error.message);
      });
  };

  return (
    <div>
      <h1 align="center">{id ? "Edit User" : "Add User"}</h1>
      <form onSubmit={handleAddUser}>
        {message && (
          <div
            align="center"
            style={{
              marginTop: "20px",
              color: message.includes("Successfully") ? "green" : "red",
            }}
          >
            {message}
          </div>
        )}
        <table align="center">
          <tbody>
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
                {errors.firstName && (
                  <div style={{ color: "red" }}>{errors.firstName}</div>
                )}
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
                {errors.lastName && (
                  <div style={{ color: "red" }}>{errors.lastName}</div>
                )}
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
                {errors.loginId && (
                  <div style={{ color: "red" }}>{errors.loginId}</div>
                )}
              </td>
            </tr>
            <tr>
              <th>Password:</th>
              <td>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
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
                {errors.dob && <div style={{ color: "red" }}>{errors.dob}</div>}
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
                {errors.gender && (
                  <div style={{ color: "red" }}>{errors.gender}</div>
                )}
              </td>
            </tr>
            <tr>
              <th>Role:</th>
              <td>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter Role"
                />
                {errors.role && (
                  <div style={{ color: "red" }}>{errors.role}</div>
                )}
              </td>
            </tr>
            <tr>
              <th></th>
              <td>
                <input type="submit" value={id ? "update" : "save"} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddUser;
