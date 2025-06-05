import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { UserValidator } from "../validators/user.validator";


import { validate } from "class-validator";


  export const userSignup = async (req:Request, res:Response) => {
    const user = new UserValidator();
    Object.assign(user, req.body);
  
    const errors = await validate(user);
    if (errors.length) {
      return res
        .status(400)
        .json({ errors: errors.map((error) => error.constraints) });
    }
  
    try {
      const hashedPassword = await bcrypt
        .hash(user.password, 10)
        .then((value) => value);
  
      user["password"] = hashedPassword;
  
      console.log("hash", user);
  
      const newUser = new User(user);
      await newUser.save();
      res.status(201).json({ msg: "Created Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

 export const userSignin= async(req:Request, res:Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, "hello", {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Successfully logged in", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  export const getUsers = async (req:Request, res:Response) => {
    try {
       const users = await User.find();
       res.json({users})
    } catch (e) {
      res.status(500).json({ error: "internal server error" });
    }
  }
