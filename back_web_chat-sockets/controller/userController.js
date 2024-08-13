import express, { request } from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/registro", async (req, res) => {
    try {
        const {nome, email, senha} = req.body;
        const user = new User({
            nome,
            email,
            senha
        });

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).send({msg: "Usuário já cadastrado"});
        }

        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(senha, salt);

        await user.save(); 
        return res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const {email, senha} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).send({msg: "Usuário não cadastrado"});
        }

        const matchPassword = await bcrypt.compare(senha, user.senha);
        if(!matchPassword) {
            return res.status(400).send({msg: "Senha incorreta"});
        }

        const token = jwt.sign({id: user._id, nome: user.nome, email:user.email}, "secret", {expiresIn: 3600});
        return res.status(200).send({token});
    } catch (error) {
        res.status(400).send(error);
    }
})

export default router;