//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const obj_arr = [];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){

  res.render("home", {arr:obj_arr,});
})

app.get("/contact", function(req,res){
  res.render("contact");
})

app.get("/poems", function(req,res){
  res.render("poems");
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  let ip_title = req.body.ip_title;
  let ip_body = req.body.ip_body;

  let obj = {ipt:ip_title,ipb:ip_body};
  obj_arr.push(obj);
  res.redirect("/");
})


app.get("/posts/:day_ip", function(req,res){
  const titles = [];
  for(var i=0;i < obj_arr.length;i++){
    if(_.lowerCase(req.params.day_ip) === _.lowerCase(obj_arr[i].ipt)){
      res.render("post", {title:obj_arr[i].ipt, para:obj_arr[i].ipb});
      break;
    }
    else{
      console.log("fail");
    }
  }
})

app.get("/login", function(req,res){
  res.render("login");
})

app.post("/login", function(req,res){
  if(req.body.passcode === "333"){
    res.render("compose");
  }
  else{
    res.render("failpg");
  }
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
