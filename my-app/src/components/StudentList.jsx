import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/student/searchStudent")
      .then((response) => {
        console.log("Data => ", response.data);
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log("Error fetching students: ", error.message);
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
