const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const userRoute = require("./routes/userRoute");
const studentRoute = require("./routes/studentRoute");
const marksheetRoute = require("./routes/marksheetRoute");
const morgan = require("morgan");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  session({
    secret: "session_secret_key",
    cookie: { secure: false },
  })
);
const PORT = 3000;

app.use("/user", userRoute);
app.use("/student", studentRoute);
app.use("/marksheet", marksheetRoute);

app.get("/", (req, res) => {
  res.send("<h1 align=center>Hello Express</h1>");
});

app.listen(PORT, () => {
  console.log(`The App is running on the url: http://localhost:${PORT}`);
});
