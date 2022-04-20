const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Chinmay:26042019@cluster0.5yvbe.mongodb.net/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const homeStartingContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let globalData = [];
const postSchema = new mongoose.Schema({
  title: String,
  post: String
});
const Post = new mongoose.model("Post",postSchema);

app.get("/",(req,res)=>{
  Post.find({},(err,result)=>{
    if(!err){
      res.render("home",{
        posts: result
      });
    }
  });
});

app.get("/compose",(req,res)=>{
  res.render("compose");
});

app.post("/compose",(req,res)=>{
  const titleInput = req.body.title;
  const postBody = req.body.postBody;
  const post = new Post({
    title: titleInput,
    post: postBody
  })
  post.save((err)=>{
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:content",(req,res)=>{
  const path = req.params.content;
  Post.findOne({_id: path},(err,result)=>{
      res.render("post",{
        title: result.title,
        post: result.post
      });   
  });


});

let port = process.env.PORT;
if(port == null || port ==""){
    port = 3000;
}

app.listen(port,()=>{
  console.log("Server running on port 3000");
});


//Live on https://obscure-plateau-67224.herokuapp.com/