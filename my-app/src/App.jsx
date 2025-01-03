import "./App.css";
import Welcome from "./components/Welcome";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import Header from "./components/Header";
import UserList from "./components/User/UserList";
import AddUser from "./components/User/AddUser";
import StudentList from "./components/Student/StudentList";
import AddStudent from "./components/Student/AddStudent";
import MarksheetList from "./components/Marksheet/MarksheetList";
import AddMarksheet from "./components/Marksheet/AddMarksheet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="userlist" element={<UserList />}></Route>
            <Route path="/addUser" element={<AddUser />}></Route>
            <Route path="/studentList" element={<StudentList />}></Route>
            <Route path="/addStudent" element={<AddStudent />}></Route>
            <Route path="/marksheetList" element={<MarksheetList />}></Route>
            <Route path="/addMarksheet" element={<AddMarksheet />}></Route>
            <Route path="/editUser/:id" element={<AddUser />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
