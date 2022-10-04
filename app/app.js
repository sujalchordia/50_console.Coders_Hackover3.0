const express= require ("express");
const path= require("path");
const mongoose=require("mongoose");

const Users= require("./Schemas/users");
const methodOverride = require('method-override');
const ejsMate= require('ejs-mate');

mongoose.connect('mongodb://localhost:27017/user_50');
const app = express();

app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/login",async(req,res)=>{
    res.render("login");
})
app.post("/login",async(req,res)=>{
    const{user_name}=req.body;
    const username=user_name;
    console.log(username);
    const users=await Users.find({user_name:username})
    console.log(users);
    res.redirect(`${users[0]._type}/home`);
})
app.get("/user/home",(req,res)=>{
    res.render("user/home");
})
app.get("user/home")
app.get("/error",(req,res)=>{
    res.send("error");
})
app.listen(3000,()=>{
    console.log("i am listening");
})