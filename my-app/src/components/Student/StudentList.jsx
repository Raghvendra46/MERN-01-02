import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    firstName: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const fetchStudents = (query = {}) => {
    const queryString = new URLSearchParams(query).toString();

    axios
      .get(`http://localhost:3000/student/searchStudent?${queryString}`)
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
  };

  const deleteStudent = (id) => {
    if (window.confirm("Confirm Student Deletion?")) {
      axios
        .post(`http://localhost:3000/student/delete/${id}`)
        .then(() => {
          alert("Student has been deleted successfully");
          fetchStudents();
        })
        .catch((error) => {
          console.log("Error deleting student: ", error.message);
          alert("Unable to delete student, try again later.");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    fetchStudents();
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
    fetchStudents(searchQuery);
  };

  return (
    <div>
      <br />
      <table>
        <tbody>
          <tr>
            First Name:
            <td>
              <input type="text" name="firstName" value={searchQuery.firstName} placeholder="Enter First Name" onChange={handleChange} />
            </td>
            <td><button onClick={handleSearchClick}>search</button></td>
          </tr>
        </tbody>
      </table>
      <form>
        <br />
        <table align="center" border={1} width="100%">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Login ID</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr key={student._id} align="center">
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.loginId}</td>
                <td>{new Date(student.dob).toLocaleDateString()}</td>
                <td>{student.gender}</td>
                <td>
                  <Link to={`/editStudent/${student._id}`}>
                    <button>Edit</button>
                  </Link>
                  &nbsp;
                  <button onClick={() => deleteStudent(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default StudentList;
