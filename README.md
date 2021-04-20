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


**Users**: Each user has two properties, all properties are `string`:
+ username
+ password (todo: encryption)

![](imgs/user1.png)

**Posts**: Each post has one sub-collection **Comments** and five properties, all properties are `string`:
+ Sub-collection: comments
+ Properties
  + creator: The user who creates the post.
  + title: Title of the post
  + *body*: Plain text in the post.
  + *url*: An url
    + Note: A post can only have either *body* or *url* that is not-null. For example, if *body* is not null, then *url* has to be null, vice versa.
  + timestamp: Use `new Date().getTime()` to generate when creating the post.

![](imgs/post1.png)

**Comments**: Sub-collection of posts. Has 3 properties, all properties are `string`:
+ commentor: The user who leaves the comment.
+ text: Plain text of the comment.
+ timestamp: Use `new Date().getTime()` to generate when leaving the comment.

![](imgs/post2.png)

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

**/api/posts**

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

