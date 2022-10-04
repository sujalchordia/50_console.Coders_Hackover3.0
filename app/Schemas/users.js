const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const UserSchema= new Schema({
    user_name: String,
    password:String,
    _type: String,
})
module.exports= mongoose.model("UserSchema",UserSchema)