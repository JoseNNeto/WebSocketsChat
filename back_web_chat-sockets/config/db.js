import mongoose from "mongoose";

const PATH = "mongodb://127.0.0.1:27017/WebChat";
// const PATH = "mongodb://172.26.130.105:27017/WebChat";
// const PATH = "mongodb://10.26.12.92:4000/WebChat";

const connectMongo = async () => {
    try {
        await mongoose.connect(PATH);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log(error);
    }
} 

export default connectMongo;