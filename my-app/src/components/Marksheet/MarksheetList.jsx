import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const MarksheetList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [marksheetList, setMarksheetList] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const fetchMarksheets = (query = {}) => {
    const queryString = new URLSearchParams(query).toString();

    axios
      .get(`http://localhost:3000/marksheet/searchMarksheet?${queryString}`)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    setErrors({ ...errors, [name]: "" });
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

  const handleSearchClick = () => {
    fetchMarksheets(searchQuery);
  };

  return (
    <div>
      <br />
      <table>
        <tbody>
          <tr>
            Name:
            <td>
              <input
                type="text"
                name="name"
                value={searchQuery.name}
                placeholder="Enter Full Name"
                onChange={handleChange}
              />
            </td>
            <td>
              <button onClick={handleSearchClick}>search</button>
            </td>
          </tr>
        </tbody>
      </table>
      <form>
        <br />
        <table align="center" border={1} width="100%">
          <thead>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Maths</th>
            <th>Percentage</th>
            <th>Status</th>
            {user.role === "User" ? <th>Actions</th> : ""}
          </thead>
          <tbody>
            {marksheetList.map((marksheet) => (
              <tr key={marksheet._id} align="center">
                <td>{marksheet.rollNo}</td>
                <td>{marksheet.name}</td>
                <td>{marksheet.physics}</td>
                <td>{marksheet.chemistry}</td>
                <td>{marksheet.maths}</td>
                <td>{percent(marksheet.totalMarks) + "%"}</td>
                <td>{checkStatus(marksheet)}</td>
                {user.role === "User" ? (
                  <td>
                    <Link to={`/editmarksheet/${marksheet._id}`}>
                      <button>Edit</button>
                    </Link>
                    &nbsp;
                    <button onClick={() => deleteMarksheet(marksheet._id)}>
                      Delete
                    </button>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default MarksheetList;
