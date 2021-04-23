/**
 * @author Chang Xu
 * @email xu.chang1@northeastern.edu
 * @create date 2021-04-22 23:32:25
 * @modify date 2021-04-23 00:44:18
 */
const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie_middleware = require('./middleware/cookie_middleware');
const firebase = require('../fbConfig');
const db = firebase.firestore();

const SECRET = "SOME RANDOM SECRET";
const TOKEN_NAME = "CS5610-ACZ";

// Cookie's lifetime
const MIN_2 = 120000;
const MIN_5 = 300000;
const MIN_15 = 900000;

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
  console.log("------ User wants to register ------");
  console.log(req.body);

  // check null
  if(req.body.username == null || req.body.password == null){
    res.status(404).send({signedUp: false, message: "Either username or password is null"});
    return; // early termination
  }

  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);

  const colRef = db.collection("users");
  colRef.where("username", "==", username).get()
  .then(querySnapshot => {
    if(!querySnapshot.empty){
      res.status(401).send({signedUp: false, message: `Username ${username} has already registered!`})
    }
    else {
      colRef.add({
        username: username,
        password: password,
      })
      .then(docRef => {
        console.log("Register Succeed!", docRef.id);
        res.status(200).send({signedUp: true, username: username});
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({signedUp: false, message: "Unable to add user to Firebase"});
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send({signedUp: false, message: "Server failed to connect to Firebase when handling sign-in logic"});
  })

});

/**
 * Tested
 * 
 * 1. Go though the middleware
 * 2. If valid cookie exists, simply responds 200, skip the following steps.
 * 3. Check if the username exists in Firebase, if not, 404
 * 4. Check if password matches, if not, 401
 * 
 * req.body.username
 * req.body.password
 */
router.post("/login", cookie_middleware, (req, res) => {
  console.log("------ User wants to login ------");
  console.log(req.body);

  if(req.cookieUsername != null){ //don't use !==
    console.log(`${req.cookieUsername} has valid cookie`);
    res.status(200).send({loggedIn: true, username: req.cookieUsername, message: `${req.cookieUsername} logged in with cookie!`});
    return; // early termination
  }
  
  // check null
  if(req.body.username == null || req.body.password == null){
    res.status(404).send({loggedIn: false, message: "Either username or password should not be null"});
    return; // early termination
  }

  const username = req.body.username;
  console.log(`${username} does not have valid cookie`);
  db.collection("users").where("username", "==", username).get()
  .then(querySnapshot => {
    if(querySnapshot.empty){
      res.status(404).send({loggedIn: false, message: `User ${username} not found.`})
    }
    else {
      const docData = querySnapshot.docs[0].data();
      if(bcrypt.compareSync(req.body.password, docData.password)){ // pass validation
        // Set a cookie here
        const token = jwt.sign(username, SECRET);
        res.cookie(TOKEN_NAME, token, {maxAge: MIN_5})
          .status(200)
          .send({loggedIn: true, username: username});
      }
      else {
        res.status(401).send({loggedIn: false, message: "Incorrect password"});
      }
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send("Server failed to connect to Firebase when handling log-in logic");
  })

});

/**
 * Tested
 * 
 * 1. Go though the middleware
 * 2. If it has a valid cookie, clear the cookie.
 * 3. Send back response
 * 
 * req.body.username
 */
router.post("/logout", cookie_middleware, (req, res) => {
  console.log("------ User wants to logout ------");
  console.log(req.body);

  // check null
  if(req.body.username == null){
    res.status(404).send({loggedOut: false, message: "Username is null"});
    return; // early termination
  }

  const username = req.body.username;
  if(req.cookieUsername != null) {
    if(req.cookieUsername === username){ //has valid cookie
      console.log(`Server is going to clear ${username}'s cookie`)
      res.clearCookie(TOKEN_NAME)
        .status(200)
        .send({loggedOut: true, username: username});
    }
    else {
      console.log(`Loggout: req username does not match cookie username.`)
      res.status(404).send({loggedOut: false, message: "Req username does not match cookie username"});
    }
  }
  else {
    res.status(200).send({loggedOut: true, username: username});
  }

});

module.exports = router;