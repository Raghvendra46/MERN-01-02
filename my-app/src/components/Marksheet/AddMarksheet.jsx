import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

const AddMarksheet = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    physics: "",
    chemistry: "",
    maths: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [studentName, setStudentName] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/student/searchStudent")
      .then((response) => {
        const name = response.data.map(
          (student) => `${student.firstName} ${student.lastName}`
        );
        setStudentName(name);
      })
      .catch((error) => {
        setMessage("An error occurred");
        console.error(error);
      });

    if (id) {
      axios
        .get(`http://localhost:3000/marksheet/getMarksheetById/${id}`)
        .then((response) => {
          const marksheetData = response.data;
          setFormData({ ...marksheetData });
        })
        .catch((error) => {
          console.log("Error in fetching Marksheet: ", error.message);
        });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!formData.rollNo) {
      newErrors.rollNo = "Roll No. is required";
    }

    if (!formData.physics) {
      newErrors.physics = "Physics marks are required";
    }

    if (!formData.chemistry) {
      newErrors.chemistry = "Chemistry marks are required";
    }

    if (!formData.maths) {
      newErrors.maths = "Maths marks are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMarksheet = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const url = id
      ? `http://localhost:3000/marksheet/update/${id}`
      : "http://localhost:3000/marksheet/save";

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
      <h1 align="center">{id ? "Edit Marksheet" : "Add Marksheet"}</h1>
      <form onSubmit={handleAddMarksheet}>
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
              <th>RollNo:</th>
              <td>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  placeholder="Enter Roll No."
                  onChange={handleChange}
                />
                {errors.rollNo && (
                  <div style={{ color: "red" }}>{errors.rollNo}</div>
                )}
              </td>
            </tr>
            <tr>
              <th>Name:</th>
              <td>
                <select
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                >
                  <option value="">--------Select Name-------</option>
                  {studentName.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>Physics:</th>
              <td>
                <input
                  type="text"
                  name="physics"
                  value={formData.physics}
                  onChange={handleChange}
                />
                {errors.physics && (
                  <div style={{ color: "red" }}>{errors.physics}</div>
                )}
              </td>
            </tr>
            <tr>
              <th>Chemistry:</th>
              <td>
                <input
                  type="text"
                  name="chemistry"
                  value={formData.chemistry}
                  onChange={handleChange}
                />
                {errors.chemistry && (
                  <div style={{ color: "red" }}>{errors.chemistry}</div>
                )}
              </td>
            </tr>
            <tr>
              <th>Maths:</th>
              <td>
                <input
                  type="text"
                  name="maths"
                  value={formData.maths}
                  onChange={handleChange}
                />
                {errors.maths && (
                  <div style={{ color: "red" }}>{errors.maths}</div>
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

export default AddMarksheet;
