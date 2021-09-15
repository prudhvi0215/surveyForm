const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(express.static("public"));

//DB connection
mongoose.connect("mongodb+srv://admin-akash:survey123@cluster0-vkuhg.mongodb.net/surveyDB",{useNewUrlParser:true});

//DB Schema
const surveySchema = new mongoose.Schema({
  name: String,
  gender:String,
  email:String,
  social_app:String,
  game_app:String,
  enjoy_app:String
});

//DB model
const Survey = mongoose.model("survey",surveySchema);

app.get("/",function(req,res){

  res.render("form");

});

app.get("/success",function(req,res){
  res.render("success");
});

app.get("/failure",function(req,res){
  res.render("failure");
});

app.post("/",function(req,res){

   msgApp=req.body.checkbox1;
   gameApp=req.body.checkbox2;
   enjoyApp=req.body.checkbox3;

  if(msgApp === "others"){
       msgApp = req.body.other_social;
  }else{
    msgApp = req.body.checkbox1;
  }

  if(gameApp === "others"){
       gameApp = req.body.other_game;
  }else{
    gameApp = req.body.checkbox2;
  }

  if(enjoyApp === "others"){
       enjoyApp = req.body.other_enjoy;
  }else{
    enjoyApp = req.body.checkbox3;
  }


   const survey = new Survey({
     name: req.body.name,
     gender:req.body.radio1,
     email:req.body.email,
     social_app: msgApp,
     game_app: gameApp,
     enjoy_app: enjoyApp
   });


   survey.save(function(err){
     if(!err){
       res.redirect("/success");
     }else{
       res.redirect("/failure");
     }
   });

});

let port = process.env.PORT;
if(port == null || port = " "){
  port = 3000;
}

app.listen(port,function(){
  console.log("Server started Successfully");
});
