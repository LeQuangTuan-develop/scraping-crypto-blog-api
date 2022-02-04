const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All admin blog here 123");
});

module.exports = router;
