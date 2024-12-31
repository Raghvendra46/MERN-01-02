import React, { useState, useEffect } from "react";
import axios from "axios";

const MarksheetList = () => {
  const [marksheetList, setMarksheetList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/marksheet/searchMarksheet")
      .then((response) => {
        console.log("Data => ", response.data);
        setMarksheetList(response.data);
      })
      .catch((error) => {
        console.log("Error fetching Marksheets: ", error.message);
      });
  }, []);

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
              <td>{percent(marksheet.totalMarks)}</td>
              <td>{checkStatus(marksheet)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default MarksheetList;
