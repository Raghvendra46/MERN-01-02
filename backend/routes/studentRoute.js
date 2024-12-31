const express = require("express");
const router = express.Router();
const studentService = require("../service/studentService");
// const { isLoggedInUser } = require("../middleware/authMiddleware");

// router.use(isLoggedInUser);

router.post("/save", (req, res) => {
  studentService
    .addStudent(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.post("/update/:id", (req, res) => {
  console.log(
    "Student of the following ID has been updated successfully: ",
    req.params.id
  );
  console.log("Updated data: ", req.body);
  studentService
    .updateStudent(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.post("/delete/:id", (req, res) => {
  console.log(
    "Student of the following ID has been deleted successfully: ",
    req.params.id
  );
  studentService
    .deleteStudent(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.get("/getStudentById/:id", (req, res) => {
  studentService
    .getStudentById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.get("/searchStudent", (req, res) => {
  const query = req.body;
  studentService
    .searchStudent(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/findByLoginId", (req, res) => {
  studentService
    .findByLoginId(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

module.exports = router;
