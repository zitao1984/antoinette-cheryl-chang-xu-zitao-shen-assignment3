// reference: https://github.com/ahjorgen167/fullstack/blob/main/routes/middleware/cookie_middleware.js
const jwt = require('jsonwebtoken')

const SECRET = "SOME RANDOM SECRET";
module.exports = function(req, res, next) {
  console.log("######Debug Info For Cookie_Middleware######")
  // First check if there is a cookie
  console.log(req.cookies); /* {webdevtoken: 'bluhbluh'} */
  if(req.cookies){
    const wdt = req.cookies.webdevtoken;
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