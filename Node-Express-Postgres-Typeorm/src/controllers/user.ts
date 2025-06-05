import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isError } from "lodash";

import {User} from "../entity/User";
import { UserValidator } from "../../validators/user.validator";

import { validate } from "class-validator";
import { AppDataSource } from "../data-source";

export const userSignup = async (req: Request, res: Response) => {
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

    const newUser = new User()
    Object.assign(newUser,user)

    const result = await AppDataSource.getRepository(User).save(user)
    console.log("hash", result);
    if (isError(result)) throw result;
    return res.status(201).json({ msg: "Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({ where: { email } });
    console.log('signin',user)
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: JSON.stringify(user.id), email: JSON.stringify(user.email) },
      "hello",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Successfully logged in", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepo = AppDataSource.getRepository(User)
    const users = await userRepo.find();
    res.json({ users });
  } catch (e) {
    res.status(500).json({ error: "internal server error" });
  }
};
