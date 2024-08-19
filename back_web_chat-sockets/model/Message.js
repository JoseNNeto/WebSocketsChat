import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    msg: {
        type: String,
    },
    sender:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        nome: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email: {
            type: String,
            required: true,
        }
    },
    receiver:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        nome: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email: {
            type: String,
            required: true,
        }
    },
}, {timestamps: true});

export default mongoose.model('message', messageSchema);