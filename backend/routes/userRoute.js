const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const { isLoggedInUser } = require("../middleware/authMiddleware");

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

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Logout failed" });
    } else {
      res.json({ message: "Logout successful" });
    }
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

router.use(isLoggedInUser);

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
  console.log("search data: ", req.query);
  const query = {};

  if (req.query.firstName) {
    query.firstName = new RegExp(req.query.firstName);
  }
  if (req.query.lastName) {
    query.lastName = new RegExp(req.query.lastName);
  }
  if (req.query.loginId) {
    query.loginId = new RegExp(req.query.loginId)
  }
  if (req.query.gender) {
    query.gender = new RegExp(req.query.gender)
  }
  if (req.query.role) {
    query.role = new RegExp(req.query.role)
  }
  console.log("query === ", query);

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
