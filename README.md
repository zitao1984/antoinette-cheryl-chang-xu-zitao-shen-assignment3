# CS5610-Project3: Backend Documentation

Author: Chang Xu

## 1. Task List

- [x] Connecting with Firebase
- [x] Designing RESTful APIs for user sign up, log in and log out, involving Cookie
- [x] Password encryption at the server side
- [x] Testing for API and writing up of documentation
- [x] [Demo](https://cs5610-pj3-backend-demo.herokuapp.com/) illustrating how React and Redux interact with RESTful API
- [x] [Video](https://drive.google.com/file/d/1KKWbCthZR8LlxM1H-SwYZ1mG1WtzQqJc/view?usp=sharing) showing how Cookie works when the page refreshes

## 2. Getting Started

**Update**: Property `userID` is no more needed for posts and comments, since we prohibit the appearance of duplicate usernames in the database.

1. Use `react-uuid` to generate unique id for `posts` to interact with the database.
2. The reason why `users` and `posts` both contain the property `timestamp` is because we need it to display components in time order. Also, it's easy to get the actual date and time from the timestamp, for example:
   ```Javascript
   >> a = new Date().getTime()
   1618696645490
   >> b = new Date(a)
   >> b.toLocaleString()
   "4/17/2021, 2:57:25 PM"
   ```
  **Note**: The type of `timestamp` is **number**, not string.

3. Please familiarize yourself with the concepts of Cookie first. Here the Cookie lifetime is set to be 5 minutes. In the video, the lifetime is set to be 2 minutes.
4. A demo showing how to use `Axios` with `redux-thunk` to send HTTP request asynchronously and update the frontend state is provided. Also it illustrates how Login logic works. The demo could be run locally, or visited [here](https://cs5610-pj3-backend-demo.herokuapp.com/).

## 3. Firebase Configuration

A sample configuration could be found in [fbConfig.js](./backend-demo/fbConfig.js).

``` JavaScript
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firåebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBZSMopHy80jczFnydpyHs6nVk6FEE2TKU",
    authDomain: "cs5610-d40ea.firebaseapp.com",
    projectId: "cs5610-d40ea",
    storageBucket: "cs5610-d40ea.appspot.com",
    messagingSenderId: "113923463244",
    appId: "1:113923463244:web:651c118a878cd0b0b97ce9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```

## 4. Data Format

**Update**: The type of `timestamp` property shown in the following screenshots has been changed to `number`.

### 4.1. post

Type: `TEXT`
![](imgs/post1.png)

Type: `LINK`
![](imgs/post2.png)

### 4.2. comment

![](imgs/comment1.png)

## 5. RESTful API

Demo of every API. Please check the source code under `/routes` folder for detailed information.

### 5.1. **/api/posts**

GET: localhost:8000/api/posts

```JSON
  {
    "CPoPrlvrO7nkNt3dQh8Y": {
        "title": "Post from local",
        "userID": "Chang001",
        "timestamp": "1618942077477",
        "username": "Chang Xu",
        "url": "",
        "text": "Some random text",
        "type": "TEXT"
    },
    "D5uub8XH7P7fdNAnAXRA": {
        "username": "Sam",
        "timestamp": "1618685580325",
        "userID": "Sam001",
        "title": "Google",
        "type": "LINK",
        "url": "https://www.google.com/",
        "text": ""
    },
    "quXGSWy85I4NjfxY7rJR": {
        "type": "TEXT",
        "text": "asdjhoaihiouasouahsfouhasoufhaoushfoiashfasf",
        "url": "",
        "userID": "someid",
        "username": "Tony",
        "title": "Test Title",
        "timestamp": "1618686341009"
    }
  }
```

POST: localhost:8000/api/posts
+ The request body should be in the format of [post](#post)

```
  WjKIkm2iVdYGkQm4O4cC (Auto-generated postID by Firestore)
```

PUT: localhost:8000/api/posts?postID=D5uub8XH7P7fdNAnAXRA
+ The request body should be in the format of [post](#post)

```
  No response, only status code 200 or 404
```

DELETE: localhost:8000/api/posts?postID=QLySgjJRnpdXnh9Ubdx1

```
  No response, only status code 200 or 404
```

### 5.2. **/api/comments**

GET: localhost:8000/api/comments?postID=CPoPrlvrO7nkNt3dQh8Y

```JSON
  {
    "3TF0DEgoCV0sFXqSMzjE": {
        "userID": "Sam001",
        "username": "Sam",
        "text": "Test posting a comment",
        "timestamp": "1618943757458"
    },
    "gKfSsNwQfdzBrqUm7HPP": {
        "userID": "Sam001",
        "text": "Test posting a comment",
        "timestamp": "1618943757458",
        "username": "Sam"
    }
  }
```

POST: localhost:8000/api/comments?postID=CPoPrlvrO7nkNt3dQh8Y
+ The request body should be in the format of [comment](#comment)

```
  kcNfB2SV86fOcflQXvua (Auto-generated commentID by Firestore)
```

PUT: localhost:8000/api/comments?postID=CPoPrlvrO7nkNt3dQh8Y&commentID=3TF0DEgoCV0sFXqSMzjE
+ The request body should be in the format of [comment](#comment)

```
  No response, only status code 200 or 404
```

DELETE: localhost:8000/api/comments?postID=CPoPrlvrO7nkNt3dQh8Y&commentID=3TF0DEgoCV0sFXqSMzjE

```
  No response, only status code 200 or 404
```

### 5.3. **/api/users**

#### 5.3.1. **Register**

To sign up, please format a request as shown below:

> POST: localhost:8000/api/users/register

The body of the request should be like:

```JSON
{
  username: <string>, 
  password: <string>
}
```

Response Body:
+ `2xx`: 
```JSON
{
  signedUp: true, 
  username: <string>
}
```
+ `4xx`:
```JSON
{
  signedUp: false, 
  message: <string>
}
```
+ `5xx`:
```JSON
{
  signedUp: false, 
  message: <string>
}
```

#### 5.3.2. **Login**

To log in, please format a request as shown below:

> POST: localhost:8000/api/users/login

The body of the request should be like:

```JSON
{
  username: <string>, 
  password: <string>
}
```

Response Body:
+ `2xx`: 
```JSON
{
  loggedIn: true, 
  username: <string>
}
```
+ `4xx`:
```JSON
{
  loggedIn: false, 
  message: <string>
}
```
+ `5xx`:
```JSON
{
  loggedIn: false, 
  message: <string>
}
```

#### 5.3.3. **Logout**

To log out, please format a request as shown below:

> POST: localhost:8000/api/users/logout

The body of the request should be like:

```JSON
{
  username: <string>
}
```

Response Body:
+ `2xx`: 
```JSON
{
  loggedOut: true, 
  username: <string>
}
```
+ `4xx`:
```JSON
{
  loggedOut: false, 
  message: <string>
}
```