const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const cookie_middleware = require('./middleware/cookie_middleware');
const firebase = require('../fbConfig');
const db = firebase.firestore();

const SECRET = "SOME RANDOM SECRET";

/**
 * Tested
 * 
 * 1. First check if the username already registered, if yes, 401
 * 2. Add user information to Firebase
 * 
 * req.body.username
 * req.body.password
 */
router.post("/register", (req, res) => {
  console.log("User wants to register");
  console.log(req.body);

  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);

  const colRef = db.collection("users");
  colRef.where("username", "==", username).get()
  .then(querySnapshot => {
    if(!querySnapshot.empty){
      res.status(401).send(`Username ${username} has registered!`)
    }
    else {
      colRef.add({
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
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send("Unable to query username")
  })

});

/**
 * Tested
 * 
 * 1. First check if the username exists in Firebase, if not, 404
 * 2. Check password, if not, 401
 * 
 * req.body.username
 * req.body.password
 */
router.post("/login", (req, res) => {
  console.log("User wants to login");
  console.log(req.body);

  const username = req.body.username;
  db.collection("users").where("username", "==", username).get()
  .then(querySnapshot => {
    if(querySnapshot.empty){
      res.status(404).send(`User ${username} not found.`)
    }
    else {
      const docData = querySnapshot.docs[0].data();
      if(bcrypt.compareSync(req.body.password, docData.password)){ // pass validation
        res.status(200).send(`${username} have successfully logged in!`);
      }
      else {
        res.status(401).send("Incorrect password");
      }
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send("Server failed to connect to Firebase when handling log-in logic");
  })

});

router.post("/logout", (req, res) => {
  console.log("User wants to logout");
});


//testing
router.post("/test", (req, res) => {
  console.log("User wants to test");
  console.log(req.body);
  db.collection('users').where("username", "==", req.body.username).get()
  .then(querySnapshot => {
    console.log(typeof(querySnapshot)) // object
    // console.log(querySnapshot)
    console.log(querySnapshot.empty)
    console.log(querySnapshot.size)
    // console.log(querySnapshot.docs)
    if(!querySnapshot.empty){
      const docData = querySnapshot.docs[0].data();
      console.log(docData);
      res.status(200).send(docData);
    }
    else
      res.status(200).send("nothing");
  })
  .catch(error => console.log(error))
});

router.get("/", (req, res) => {
  res.status(404).send("Invalid API call");
})

module.exports = router;