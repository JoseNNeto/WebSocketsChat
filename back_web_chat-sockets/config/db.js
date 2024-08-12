import mongoose from "mongoose";

const PATH = "mongodb://localhost:27017/WebChat";

const connectMongo = async () => {
    try {
        await mongoose.connect(PATH);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log(error);
    }
} 

export default connectMongo;