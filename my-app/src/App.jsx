import "./App.css";
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

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
            <Route path="addUser" element={<AddUser />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
