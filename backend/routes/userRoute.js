const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
// const { isLoggedInUser } = require("../middleware/authMiddleware");

router.post("/signUp", (req, res) => {
  userService
    .addUser(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log("Error: ", error.message);
    });
});

router.post("/login", (req, res) => {
  console.log("Login Data: ", req.body);
  userService
    .authenticate(req.body.loginId, req.body.password)
    .then((user) => {
      if (!user) {
        throw new Error("invlaid loginId and password");
      } else {
        req.session.user = user;
        console.log("session ID: ", req.session.id);
        res.json({
          message: "User Logged In Successfully",
          user: user,
        });
      }
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

// router.use(isLoggedInUser);

router.post("/save", (req, res) => {
  userService
    .addUser(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log("Error: ", error.message);
    });
});

router.post("/update/:id", (req, res) => {
  console.log("id: ", req.params.id);
  console.log("data: ", req.body);
  userService
    .updateUser(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.post("/delete/:id", (req, res) => {
  console.log("id: ", req.params.id);
  userService
    .deleteUser(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/getUserById/:id", (req, res) => {
  console.log("id: ", req.params.id);
  userService
    .getUserById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/search", (req, res) => {
  console.log("search data: ", req.body);
  const query = req.body;
  userService
    .searchUser(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/findByLoginId", (req, res) => {
  console.log("Login ID: ", req.body);
  userService
    .findByLoginId(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

module.exports = router;
