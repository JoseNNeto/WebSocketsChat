import express, { request } from "express";

const router = express.Router();

router.get("/:id", getMsg);

export default router;