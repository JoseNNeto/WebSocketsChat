import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
    },
    senha:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
});

export default mongoose.model('User', userSchema);