import "./App.css";
import Greeting from "./components/Greeting";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () =>  {
  return (
    <>
      <Router>
        <div>
          <Greeting name="User" />
        </div>

        <nav>
          &nbsp;&nbsp;
          <Link to={"/"}>Home</Link> |&nbsp;&nbsp;
          <Link to={"/about-us"}>About-us</Link> |&nbsp;&nbsp;
          <Link to={"/contact-us"}>Contact-us</Link> |&nbsp;&nbsp;
          <Link to={"/signup"}>Signup</Link> |&nbsp;&nbsp;
          <Link to={"/login"}>Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
