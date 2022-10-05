const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const UserSchema= new Schema({
    user_name: String,
    password:String,
    _type: String,
    bookedevents:[String],
    createdevents:[String],
    isban:{
        type:Number,
        default:0
    }
})
module.exports= mongoose.model("UserSchema",UserSchema)