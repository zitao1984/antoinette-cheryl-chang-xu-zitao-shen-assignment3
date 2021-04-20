const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');

router.get("/", (req, res) => {
  res.send("GET from users request received");
});

router.post("/", (req, res) => {
  res.send("POST from users request received");
});

router.put("/", (req, res) => {
  res.send("PUT from users request received");
});

router.delete("/", (req, res) => {
  res.send("DELETE from users request received");
});

module.exports = router;