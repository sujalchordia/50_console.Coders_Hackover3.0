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

app.get("/:type/login",async(req,res)=>{
    const types=req.params.type;
    res.render("login",{types});
})
app.listen(3000,()=>{
    console.log("i am listening");
})