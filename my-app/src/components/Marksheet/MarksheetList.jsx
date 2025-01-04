import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const MarksheetList = () => {
  const [marksheetList, setMarksheetList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const fetchMarksheets = () => {
    axios
      .get("http://localhost:3000/marksheet/searchMarksheet")
      .then((response) => {
        if (response.status === 401) {
          setIsAuthenticated(false);
        } else {
          setMarksheetList(response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching Students: ", error.message);
        setIsAuthenticated(false);
      });
  };

  const deleteMarksheet = (id) => {
    if (window.confirm("Confirm Marksheet Deletion?")) {
      axios
        .post(`http://localhost:3000/marksheet/delete/${id}`)
        .then(() => {
          alert("Marksheet has been deleted successfully");
          fetchMarksheets();
        })
        .catch((error) => {
          console.log("Error deleting marksheet: ", error.message);
          alert("Unable to delete marksheet, try again later");
        });
    }
  };

  useEffect(() => {
    fetchMarksheets();
  }, []);

  if (!isAuthenticated) {
    return (
      <div align="center">
        <br />
        <h3 color="red">You are not authorized to access this page.</h3>
      </div>
    );
  }

  const percent = (totalMarks) => {
    const totalMaximumMarks = 300;
    return ((totalMarks / totalMaximumMarks) * 100).toFixed(2);
  };

  const checkStatus = (marksheet) => {
    if (
      marksheet.physics >= 33 &&
      marksheet.chemistry >= 33 &&
      marksheet.maths >= 33
    ) {
      return "Pass";
    } else {
      return "Fail";
    }
  };

  return (
    <form>
      <br />
      <table align="center" border={1} width="100%">
        <thead>
          <th>Roll No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Physics</th>
          <th>Chemistry</th>
          <th>Maths</th>
          <th>Percentage</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {marksheetList.map((marksheet) => (
            <tr key={marksheet._id} align="center">
              <td>{marksheet.rollNo}</td>
              <td>{marksheet.firstName}</td>
              <td>{marksheet.lastName}</td>
              <td>{marksheet.physics}</td>
              <td>{marksheet.chemistry}</td>
              <td>{marksheet.maths}</td>
              <td>{percent(marksheet.totalMarks) + "%"}</td>
              <td>{checkStatus(marksheet)}</td>
              <td>
                <Link to={`/editMarksheet/${marksheet._id}`}>
                  <button>Edit</button>
                </Link>
                &nbsp;
                <button onClick={() => deleteMarksheet(marksheet._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default MarksheetList;
