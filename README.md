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

### RESTful API(todo)

