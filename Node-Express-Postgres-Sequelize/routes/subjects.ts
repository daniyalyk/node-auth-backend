import express from "express";
import { checkAuth } from "../middleware/check-auth";
import { createSubject } from "../controllers/subjects";

const router = express.Router();

router.post('/',createSubject)

export default router