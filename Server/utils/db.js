const mongoose = require('mongoose');

const URI =process.env.MONGODB_URI;


const connectDb = async () =>{
    try{
         await mongoose.connect(URI);
         console.log("Conncetion Successful");
    }catch(error){
        console.error("Database Conncetion Failed");
        process.exit(0);
    }
}
module.exports  = connectDb;