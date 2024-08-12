import express, { request } from "express";
import User from "../model/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {nome, email, senha} = req.body;
        const user = new User({
            nome,
            email,
            senha
        });
        await user.save();
        return res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

export default router;