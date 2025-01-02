import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/student/searchStudent")
      .then((response) => {
        if (response.status === 401) {
          setIsAuthenticated(false);
        } else {
          setStudentList(response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching students: ", error.message);
        setIsAuthenticated(false);
      });
  }, []);

  if (!isAuthenticated) {
    return (
      <div align="center">
        <br />
        <h3 color="red">You are not authorized to access this page.</h3>
      </div>
    );
  }

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
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr key={student._id} align="center">
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.loginId}</td>
              <td>{student.dob}</td>
              <td>{student.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default StudentList;
