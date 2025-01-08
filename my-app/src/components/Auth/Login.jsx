import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Login ID => ", formData.loginId);
  };

  const validate = () => {
    const newErrors = {};

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    axios
      .post("http://localhost:3000/user/login", formData)
      .then((response) => {
        const user = response.data.user;
        console.log("user =", user);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setMessage("Login Successful!");
          navigate("/");
          console.log("response => ", response.data);
        }
      })
      .catch((error) => {
        setMessage("Unable to Login User");
        console.log("error: ", error.message);
      });
  };

  return (
    <div>
      <h1 align="center">User Login</h1>
      <form onSubmit={handleLogin}>
        {message && (
          <div
            align="center"
            style={{
              marginTop: "20px",
              color: message.includes("Successful") ? "green" : "red",
            }}
          >
            {message}
          </div>
        )}
        <table align="center">
          <tbody>
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
              <th></th>
              <td>
                <input type="submit" value="Login" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Login;
