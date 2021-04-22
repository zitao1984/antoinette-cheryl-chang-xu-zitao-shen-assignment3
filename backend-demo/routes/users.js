const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt')
const firebase = require('../fbConfig');
const db = firebase.firestore();

const SECRET = "SOME RANDOM SECRET";

/**
 * Tested
 * 
 * req.body.username
 * req.body.password
 */
router.post("/register", (req, res) => {
  console.log("User wants to register");
  console.log(req.body);

  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);

  db.collection("users").add({
    username: username,
    password: password,
  })
  .then(docRef => {
    console.log("Register Succeed!", docRef.id);
    res.status(200).send(docRef.id);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send("Unable to add user to Firebase");
  })
  
});

router.post("/login", (req, res) => {
  console.log("User wants to login");
  
});

router.post("/logout", (req, res) => {
  console.log("User wants to logout");
});

router.get("/", (req, res) => {
  res.status(404).send("Invalid API call");
})

module.exports = router;