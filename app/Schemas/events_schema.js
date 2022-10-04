const mongoose=require("mongoose");
const { arrayBuffer } = require("stream/consumers");
const Schema= mongoose.Schema;

const EventSchema= new Schema({
    title: String,
    price:String,
    image:String,
    description: String,
    location: String,
    organizer_id: String,
    time:String,
    date:String,
})
module.exports= mongoose.model("EventSchema", EventSchema)