# Antoinette-Cheryl-Chang-Xu-Zitao-Shen-assignment3
For web assignment3

## Chang Xu (backend)

### Firebase Configuration

``` JavaScript
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
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

### Mock Data

#### user

Each user has two properties, all properties are `string`:
+ username
+ password (todo: encryption)

![](imgs/user1.png)

#### post


Type: `TEXT`
![](imgs/post1.png)

Type: `LINK`
![](imgs/post2.png)

#### comment

![](imgs/comment1.png)

### Some design ideas

1. It may be a good idea to use `react-uuid` to generate unique id for both `users` and `posts` to interact with the database.
2. The reason why `users` and `posts` both contain the property `timestamp` is because we need it to display components in time order. Also, it's easy to get the actual date and time from the timestamp, for example:
   ```Javascript
   >> a = new Date().getTime()
   1618696645490
   >> b = new Date(a)
   >> b.toLocaleString()
   "4/17/2021, 2:57:25 PM"
   ```

### RESTful API

Demo of every API. Please check the source code under `/routes` folder for detailed information.

#### **/api/posts**

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

#### **/api/comments**

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