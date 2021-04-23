const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors({
    origin: '*',
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  // console.log(process.env.PORT);
  console.log('Starting server');
});
