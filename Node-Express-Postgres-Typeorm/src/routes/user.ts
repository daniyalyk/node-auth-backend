import express from "express";
import { checkAuth } from "../middleware/check-auth";
import { getUsers, userSignin, userSignup } from "../controllers/user";

const router = express.Router();

router.get("/",checkAuth, getUsers);

router.post("/signin", userSignin);

router.post("/signup", userSignup);

export default router;
