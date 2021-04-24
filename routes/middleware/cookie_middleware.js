// reference: https://github.com/ahjorgen167/fullstack/blob/main/routes/middleware/cookie_middleware.js
const jwt = require('jsonwebtoken')

const SECRET = "SOME RANDOM SECRET";
const TOKEN_NAME = "CS5610-ACZ";

/**
 * If there is not valid cookie (e.g. cookie expired), then do nothing
 * If cookie failed to be verified (e.g. modified by malicious software), then res 499
 * If cookie got verified, then append cookieUsername property to req, with value of the decoded information
 */
module.exports = function(req, res, next) {
  console.log("######Debug Info For Cookie_Middleware######")
  console.log(req.cookies[TOKEN_NAME]); /* {TOKEN_NAME: 'bluhbluh'} */
  // First check if there is a cookie
  if(req.cookies){
    const wdt = req.cookies[TOKEN_NAME];
    if (!wdt) {
      // return res.status(401).send("No valid web dev token given")
      console.log("No valid web dev token given");
    } 
    else {
      jwt.verify(wdt, SECRET, function(error, decoded_token) {
        if (error) {
          console.log("Invalid token");
          return res.status(499).send("Invalid token");
        } else {
          console.log("Valid cookie")
          req.cookieUsername = decoded_token;
        }
      })
    }
  }
  // don't forget this! It will lead to the next router
  next();
}