const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');
const firebase = require('../fbConfig');

const db = firebase.firestore();
const COLLECTION = "posts";

router.get("/", (req, res) => {
  console.log("GET to /api/posts received");
  db.collection(COLLECTION).get()
  .then((querySnapshot) => {
    let result = {};
    querySnapshot.forEach((doc) => {
      result[doc.id] = doc.data();
    });
    // return a JSON
    res.status(200).send(result);
  })
  .catch((error) => {
    console.log(error);
    res.status(200).send("Failed to get posts from database")
  })
});

// need req.body
router.post("/", (req, res) => {
  console.log("POST to /api/posts received");
  console.log(req.body);
  // let firebase generate ID
  db.collection(COLLECTION).add(req.body)
  .then((docRef) => {
    console.log(docRef.id);
    res.status(201).send(docRef.id);
  })
  .catch(error => {
    console.log(error);
    res.status(200).send("Failed to add post to database")
  })
});

router.put("/", (req, res) => {
  console.log("PUT to /api/posts received");
});

router.delete("/", (req, res) => {
  console.log("DELETE to /api/posts received");
});

module.exports = router;