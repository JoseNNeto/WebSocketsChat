import Message from "../model/Message.js";

export const saveMessage = async (msgData) => {
    try {
        // const {msg, sender, receiver} = msgData;
        // const message = new Message({
        //     msg,
        //     sender,
        //     receiver
        // });

        const message = new Message(msgData);

        await message.save(); 
        console.log("Message Saved: ", message);
        return message;
    } catch (error) {
        console.error("Error Saving Message: ", error);
        throw error;  // Lança o erro para que ele possa ser tratado no lugar onde a função é chamada
    }
}