const mongoose=require("mongoose");
const UserSchema= require("../Schemas/users");

mongoose.connect('mongodb://localhost:27017/user_50');

const User_db= async()=>{
    await UserSchema.deleteMany();
    const users= new UserSchema({
        user_name: "sujal.chordia",
        password:"sujal",
        _type:"user",
        bookedevents:[],
        createdevents:[]
        })
    await users.save();
    const users_2= new UserSchema({
        user_name: "aryaman.chokhani",
        password:"aryaman",
        _type:"user",
        bookedevents:[],
        createdevents:[]
    })
    await users_2.save();
    const users_3= new UserSchema({
        user_name: "darshit.bhagtani",
        password:"darshit",
        _type:"user",
        bookedevents:[],
        createdevents:[]
    })
    await users_3.save();
    const Organizer= new UserSchema({
        user_name: "asmi.bhanushali",
        password:"asmi",
        _type:"organizer",
        bookedevents:[],
        createdevents:[]
    })
    await Organizer.save();
    const Organizer_2= new UserSchema({
        user_name: "jaydeep.jethwa",
        password:"jaydeep",
        _type:"organizer",
        bookedevents:[],
        createdevents:[]
    })
    await Organizer_2.save();
    const Organizer_3= new UserSchema({
        user_name: "anusha.maniar",
        password:"anusha",
        _type:"organizer",
        bookedevents:[],
        createdevents:[]
    })
    await Organizer_3.save();
    const Organizer_4= new UserSchema({
        user_name: "admin",
        password:"admin123",
        _type:"admin",
        bookedevents:[],
        createdevents:[]
    })
    await Organizer_4.save();
}

User_db();