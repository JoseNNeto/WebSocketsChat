import Message from "../model/Message.js";

export const saveMessage = async (msgData) => {
    try {
        const message = new Message(msgData);

        await message.save(); 
        console.log("Message Saved: ", message);
        return message;
    } catch (error) {
        console.error("Error Saving Message: ", error);
        throw error;  // Lança o erro para que ele possa ser tratado no lugar onde a função é chamada
    }
}

export const getMsg = async (req, res) => {
    const id = req.params.id;

    try {
        if (!id){
            return res.status(400).send({msg: "Id do usuário é obrigatório"});
        }
      
        const messages = await Message.find({$or: [{"sender.id": id}, {"receiver.id": id}]}).sort({createdAt: 1});
        res.status(200).send({
            data: messages,
            msg: "Mensagens carregadas com sucesso"
        });
    } catch (error) {
        res.status(500).send({msg: "Internal Server Error"});
    }
}

export const deleteMsg = async (req, res) => {
    const id = req.params.id;

    try {
        if (!id){
            return res.status(400).send({msg: "Id da mensagem é obrigatório"});
        }

        const deletedMessage = await Message.findByIdAndDelete(id);
        return res.status(200).send({data:deletedMessage, msg: "Mensagem deletada com sucesso"});
    } catch (error) {
        res.status(500).send({msg: "Internal Server Error"});
    }
}