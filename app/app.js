const express= require ("express");
const path= require("path");
const mongoose=require("mongoose");

const Users= require("./Schemas/users");
const Events= require("./Schemas/events_schema");
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
    if(users[0].isban===1){
        console.log(users[0].isban)
        res.render("organizer/error")
    }
    const AllEvents=await Events.find();
    const AllUsers=await Users.find()
    res.render(`${users[0]._type}/home`,{users,AllUsers,AllEvents});
})
app.get("/user/home/:id",async(req,res)=>{
    const{id}=req.params;
    const users=await Users.find({_id:id})
    const AllEvents=await Events.find();
    res.render("user/home",{users, AllEvents});
})
app.get("/user/b/:id",async(req,res)=>{
    const{id}=req.params;
    const users=await Users.find({_id:id})
    const eventids=users[0].bookedevents;
    let Bookedevents=[];
    for(let i=0;i<eventids.length;i++){
        const temp=await Events.findById(eventids[i]);
        Bookedevents.push(temp);
    }
    res.render("user/booked",{users,Bookedevents});
})

app.get("/user/gateway/:id/:eventid",async(req,res)=>{
    const{id,eventid}=req.params;
    const users=await Users.find({_id:id})
    res.render("user/gateway",{users,eventid});
})
app.get("/user/addevent/:id/:eventid",async(req,res)=>{
    const{id,eventid}=req.params;
    const users=await Users.find({_id:id})
    users[0].bookedevents.push(eventid);
    const eventids=users[0].bookedevents;
    await Users.findByIdAndUpdate(id,{bookedevents:eventids});
    let Bookedevents=[];
    for(let i=0;i<eventids.length;i++){
        const temp=await Events.findById(eventids[i]);
        Bookedevents.push(temp);
    }
    console.log(Bookedevents);
    res.render("user/booked",{users,Bookedevents});
})

// ORGANIZERS'ROUTES
app.get("/organizer/home/:id",async(req,res)=>{
    const{id}=req.params;
    const users=await Users.find({_id:id})
    const AllEvents=await Events.find();
    res.render("organizer/home",{users, AllEvents});
})

app.get("/organizer/create/:id",async (req,res)=>{
    const{id}=req.params;
    const temp=await Users.findById(id);
    console.log(temp);
    res.render("organizer/create",{temp});
})
app.post("/organizer/create/:id",async (req,res)=>{
    const{id}=req.params;
    req.body.organizer_id=id;
    const newevent= new Events(req.body);
    await newevent.save();
    const users=await Users.find({_id:id})
    users[0].createdevents.push(newevent._id);
    const eventids=users[0].createdevents;
    await Users.findByIdAndUpdate(id,{createdevents:eventids});
    // redirect to created events page
    const CreatedEvents=[];
    const temp= users[0].createdevents;
    for(let i=0;i<temp.length;i++){
        const events=await Events.findById(temp[i]);
        CreatedEvents.push(events);
    }
    res.render("organizer/views",{users,CreatedEvents});
})
//connecting views of user
app.get("/organizer/view/:id",async (req,res)=>{
    const{id}=req.params;
    const users=await Users.find({_id:id});
    const temp= users[0].createdevents;
    const CreatedEvents=[];
    for(let i=0;i<temp.length;i++){
        const events=await Events.findById(temp[i]);
        CreatedEvents.push(events);
    }
    res.render("organizer/views",{users,CreatedEvents});
})



//adding delete feature
// app.delete("/organizer/:id/:eventid",async(req,res)=>{
//     const {id}= req.params;
//     const {eventid}= req.params;
//     await Events.findByIdAndDelete(eventid);
    
//     const users=await Users.find({_id:id})
//     const AllEvents=await Events.find();
//     res.render("organizer/home",{users, AllEvents});
// })

//adding edit features

app.get("/organizer/:id/:eventid",async(req,res)=>{
    const {id,eventid}= req.params;
    const events=await Events.find({_id:eventid})
    const users=await Users.find({_id:id})
    res.render("organizer/edit.ejs",{users,events});
})
app.put("/organizer/:id/:eventid",async(req,res)=>{
    const {id,eventid}= req.params;
    const updated= await Events.findByIdAndUpdate(eventid,req.body);
    

    const users=await Users.find({_id:id});
    const temp= users[0].createdevents;
    const CreatedEvents=[];
    for(let i=0;i<temp.length;i++){
        const events=await Events.findById(temp[i]);
        CreatedEvents.push(events);
    }
    res.render("organizer/views",{users,CreatedEvents});
})


//admin routes
app.post("/login",async(req,res)=>{
    const{user_name}=req.body;
    const username=user_name;
    const users=await Users.find({user_name:username})
    const AllEvents=await Events.find();
    res.render(`${users[0]._type}/home`,{users,AllEvents});
})

app.get("/admin/Org",async(req,res)=>{
    const users=await Users.find()
    const AllEvents=await Events.find();
    console.log(AllEvents);
    res.render(`admin/Org`,{users,AllEvents});
})
app.get("/admin/Sales",async(req,res)=>{
    const users=await Users.find()
    const AllEvents=await Events.find();
    console.log(AllEvents);
    res.render(`admin/Sales`,{users,AllEvents});
})
app.get("/admin/tempban/:id",async(req,res)=>{
    const users=await Users.find()
    const AllEvents=await Events.find();
    const{id}=req.params;
    await Users.findByIdAndUpdate(id,{isban:1});
    res.render(`admin/Org`,{users,AllEvents});
})
app.get("/admin/verification",async(req,res)=>{
    const users=await Users.find()
    const AllEvents=await Events.find();
    const{id}=req.params;
    await Users.findByIdAndUpdate(id,{isban:1});
    res.render(`admin/verification`,{users,AllEvents});
})

app.listen(3000,()=>{
    console.log("i am listening");
})