/**
 * @author Chang Xu
 * @email xu.chang1@northeastern.edu
 * @create date 2021-04-22 23:38:11
 * @modify date 2021-04-22 23:38:15
 */
const Axios = require('axios');

const REGISTER = "http://localhost:8000/api/users/register";
const LOGIN = "http://localhost:8000/api/users/login";
const LOGOUT = "http://localhost:8000/api/users/logout";

Axios.post(REGISTER, {username: "Susie", password: "123456"})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.log(error.response.status);
  console.log(error.response.data);
})

Axios.post(REGISTER, {username: "Sam", password: "sam00100"})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.log(error.response.status);
  console.log(error.response.data);
})

Axios.post(LOGIN, {username: "Sam", password: "sam001"})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.log(error);
})

Axios.post(LOGIN, {username: "Sam", password: "wrong password"})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.log(error.response.status);
  console.log(error.response.data);
})

Axios.post(LOGIN, {username: "not-exist", password: "password"})
.then(res => {
  console.log(res.data);
})
.catch(error => {
  console.log(error.response.status);
  console.log(error.response.data);
})

