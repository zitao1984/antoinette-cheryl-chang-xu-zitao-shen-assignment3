const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');
const firebase = require('../fbConfig');

const db = firebase.firestore();

/**
 * req.query.postID
 * 
 *
 * Res: {
 *   commentID1: {}, commentID2: {}, ...
 * }
 *
 * If the post with given ID has no comments or it doesn't have subcollection 'comments' (when the post is just created), simply sends back {}
 */
router.get("/", (req, res) => {
  console.log("GET to /api/comments received");
  console.log(req.query) // don't use req.params
  
  const postID = req.query.postID;
  db.collection("posts").doc(postID).collection("comments").get()
  .then((querySnapshot) => {
    let result = {};
    // doc.data() is never undefined for query doc snapshots
    querySnapshot.forEach((doc) => {
      result[doc.id] = doc.data();
    });
    // return a JSON
    res.status(200).send(result);
  })
  .catch((error) => {
    console.log(error);
    res.status(200).send("Failed to get comments from database")
  })
});

/**
 * req.query.postID
 * req.body
 */
router.post("/", (req, res) => {
  console.log("POST to /api/comments received");
  console.log(req.query) // don't use req.params
  console.log(req.body);

  const postID = req.query.postID;
  // let firebase generate ID
  db.collection("posts").doc(postID).collection("comments").add(req.body)
  .then((docRef) => {
    console.log(docRef.id);
    res.status(201).send(docRef.id);
  })
  .catch(error => {
    console.log(error);
    res.status(200).send("Failed to add comment to database")
  })
});

// router.put("/", (req, res) => {
//   res.send("PUT to /api/comments received");
// });

// router.delete("/", (req, res) => {
//   res.send("DELETE to /api/comments received");
// });

module.exports = router;