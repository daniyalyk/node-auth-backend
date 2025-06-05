import express from "express";
import { checkAuth } from "../middleware/check-auth";
import { getStudents, getTeachers, getUsers, userSignin, userSignup } from "../controllers/user";

const router = express.Router();

router.get("/", getUsers);

router.get("/teachers",getTeachers)

router.get("/students",getStudents)

router.post("/signin", userSignin);

router.post("/signup", userSignup);

// router.get("/check", ()=>'runing');

export default router;
