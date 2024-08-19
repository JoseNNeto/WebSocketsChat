import express, { request } from "express";
import { getMsg, deleteMsg } from "../service/messageService.js";

const router = express.Router();

router.get("/:id", getMsg);
router.delete("/:id", deleteMsg);

export default router;