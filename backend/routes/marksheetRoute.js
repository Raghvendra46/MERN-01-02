const express = require("express");
const router = express.Router();
const marksheetService = require("../service/marksheetService");
// const { isLoggedInUser } = require("../middleware/authMiddleware");

// router.use(isLoggedInUser);

router.post("/save", (req, res) => {
  marksheetService
    .addMarksheet(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.post("/update/:id", (req, res) => {
  marksheetService
    .updateMarksheet(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.post("/delete/:id", (req, res) => {
  marksheetService
    .deleteMarksheet(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/getMarksheetById/:id", (req, res) => {
  marksheetService
    .getMarksheetById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/searchMarksheet", (req, res) => {
  const query = req.body;
  marksheetService
    .searchMarksheet(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/findByRollNo", (req, res) => {
  marksheetService
    .findByRollNo(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

router.get("/getMeritList/:limit", (req, res) => {
  const limit = req.params.limit;
  marksheetService
    .getMeritList(limit)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log("Error fetching Merit list: ", error);
      res.send({ error: error.message });
    });
});

module.exports = router;
