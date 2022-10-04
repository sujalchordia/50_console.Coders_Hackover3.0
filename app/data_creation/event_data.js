const mongoose=require("mongoose");
const EventSchema= require("../Schemas/events_schema");

mongoose.connect('mongodb://localhost:27017/user_50');

const Event_db= async()=>{
    await EventSchema.deleteMany();
    const users= new EventSchema(
        {
        title: "Live Concert-Anuv Jain",
        price:"699",
        image:"https://rollingstoneindia.com/wp-content/uploads/2022/03/Anuv-Jain-1-960x1200.jpg",
        description:"Anuv Jain is an Indian singer, songwriter, and music composer who has given us some superhitsongs like Baarishein, Alag Aasmaan, Gul, and many more. ",
        location: "JVPD ground,  Juhu",
        organizer_id:"633c4085e360ba1051a5d45f",
        time:"7pm",
        date:"22nd November,Saturday"
        })
        users.save();
        
        
        
       const users_1= new EventSchema({
        title: "Standup Comedy - Akash Gupta",
        price:"499",
        image:"https://imgmediagumlet.lbb.in/media/2020/11/5faa972c6bed739778e6771e_1605015340194.jpg?fm=webp&w=750&h=500&dpr=1",
        description:"This stand-up solo show is an amalgamation of observational humor & personal anecdotes topped with energetic actouts on stage. Also known as 'Mr Versatile', Aakash is known for his sudden jokes, character comedy, quirkyobservations and a stellar performance. ",
        location: "The Laughter Club,Bandra",
        organizer_id:"633c4085e360ba1051a5d461",
       Time:"8 pm",
       Date:"15th November,Friday"
        })
        users_1.save();
        
       const users_2= new EventSchema({
        title: "Educational Event - Hackathon",
        price:"300 per team",
        image:"https://img.freepik.com/premium-vector/hackathon-program-code-software-marathon-hack-day-hackfest-codefest-event-vector-hackathon-background_53562-9753.jpg?w=900",
        description:"Hackathon is a Sprint like design event where in computer programmers and others involved in software development, including graphic designers, interface designers, product managers, domain exports and others collaborate intensively on software projects  ",
        location: "Conducted online ",
        organizer_id:"633c4085e360ba1051a5d463",
       Time:"4 pm",
       Date:"29th November to 30th November"
        })
        users_2.save();
       }

Event_db();
