const jwt = require('jsonwebtoken')

const SECRET = "SOME RANDOM SECRET";

module.exports = function(req, res, next) {

  const wdt = req.cookie.webdevtoken;
  


}