const express = require('express');
const app = express();
app.set('view engine', 'ejs');
var timeout = require('connect-timeout')
const noblox = require('noblox.js');
app.use(express.urlencoded({ extended: true }));
var forums_database = [];
var replies_database = [];

var forums_database2 = [];
var replies_database2 = [];

app.use(timeout('5s'))
app.use(bodyParser())
app.use(haltOnTimedout)
app.use(cookieParser())
app.use(haltOnTimedout)

app.get('/', (req, res) => {
  res.render('threads');
})

app.post('/create-post', (req, res) => {
  console.log(req.body);
  forums_database.push({ Name: req.body.postName, Content: req.body.postContent, Thread: 1 });
  res.redirect('/')
})

app.post('/reply-to-post', (req, res) => {
  var reply = req.body.reply;
  console.log('?')
  var op = req.body.op;

  for (i = 0; i < forums_database.length; i++) {
    console.log(forums_database[i].Name, op)
    if (forums_database[i].Name === op) {
      replies_database.push({ RPost: reply, OP: op })
      console.log(replies_database)
      res.redirect('/')
    }
  }
})

app.get('/view-post/:target', (req, res) => {
  for (i = 0; i < forums_database.length; i++) {
    var track = req.params.target;
    console.log(track)
    if (forums_database[i].Name === track) {
      var targetname = forums_database[i].Name;
      var targetcontent = forums_database[i].Content;
      var Replies = replies_database
      console.log(Replies)
      res.render('view-post', { targetname, targetcontent, Replies })
    }
  }
})

app.get('/main', (req, res) => {
  res.render('main', { forums_database });
})

app.get('/gamedevelopment', (req, res) => {
  res.render('main', { forums_database2 });
})

app.post('/create-post2', (req, res) => {
  console.log(req.body);
  forums_database2.push({ Name: req.body.postName, Content: req.body.postContent, Thread: 1 });
  res.redirect('/')
})

app.post('/reply-to-post2', (req, res) => {
  var reply = req.body.reply;
  console.log('?')
  var op = req.body.op;

  for (i = 0; i < forums_database2.length; i++) {
    console.log(forums_database2[i].Name, op)
    if (forums_database2[i].Name === op) {
      replies_database2.push({ RPost: reply, OP: op })
      console.log(replies_database2)
      res.redirect('/')
    }
  }
})

app.get('/view-post2/:target', (req, res) => {
  for (i = 0; i < forums_database.length; i++) {
    var track = req.params.target;
    console.log(track)
    if (forums_database[i].Name === track) {
      var targetname = forums_database[i].Name;
      var targetcontent = forums_database[i].Content;
      var Replies = replies_database
      console.log(Replies)
      res.render('view-post2', { targetname, targetcontent, Replies })
    }
  }
})

app.listen(3000)
