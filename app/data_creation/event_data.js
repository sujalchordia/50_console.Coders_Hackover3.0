const mongoose=require("mongoose");
const EventSchema= require("../Schemas/events_schema");

mongoose.connect('mongodb://localhost:27017/user_50');

const Event_db= async()=>{
    await EventSchema.deleteMany();
    const users= new EventSchema({
    title: " SHAKESPEARE DRAMA",
    price:"500",
    image:"https://tse1.mm.bing.net/th?id=OIP.PLQlF0A-S2FrSQIAfly5FAHaEK&pid=Api&P=0",
    description:"Shakespeare is known as the Father of English Drama. He is known as Englands national poet, and the “Bard of Avon”. His works, including collaborations, consist of 38 plays,154 sonnets, two long narrative poems, and some other verses, some of the uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other dramatist.",
    location: "Andheri",
    organizer_id:"633c4085e360ba1051a5d45f"
    })
    users.save();
}

Event_db();
