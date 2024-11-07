const mongoose=require("mongoose");
require("dotenv").config();
const db = process.env.MONGO_URI;
// const config=require("config");
// const db=config.get("mongoURI");

const connectDB=async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB Connected..");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports=connectDB;