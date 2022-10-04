const mongoose=require("mongoose");
const UserSchema= require("../Schemas/users");

mongoose.connect('mongodb://localhost:27017/user_50');

const User_db= async()=>{
    await UserSchema.deleteMany();
    const users= new UserSchema({
        user_name: "sujal.chordia",
        password:"sujal",
        _type:"user",
    })
    await users.save();
    const users_2= new UserSchema({
        user_name: "aryaman.chokhani",
        password:"aryaman",
        _type:"user",
    })
    await users_2.save();
    const users_3= new UserSchema({
        user_name: "darshit.bhagtani",
        password:"darshit",
        _type:"user",
    })
    await users_3.save();
    const Organizer= new UserSchema({
        user_name: "asmi.bhanushali",
        password:"asmi",
        _type:"organizer"
    })
    await Organizer.save();
    const Organizer_2= new UserSchema({
        user_name: "jaydeep.jethwa",
        password:"jaydeep",
        _type:"organizer"
    })
    await Organizer_2.save();
    const Organizer_3= new UserSchema({
        user_name: "anusha.maniar",
        password:"anusha",
        _type:"organizer"
    })
    await Organizer_3.save();
}

User_db();