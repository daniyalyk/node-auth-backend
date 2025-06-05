import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isError } from "lodash";

import { UserValidator } from "../validators/user.validator";

import { validate } from "class-validator";
import User from "../models/user";
import Subject from "../models/subject";
import TeacherSubject from "../models/teacherSubject";
import StudentSubject from "../models/StudentSubject";

export const userSignup = async (req: Request, res: Response) => {
  const {...rest} = new UserValidator();
  Object.assign(rest, req.body);
  const {subjectName} =  req.body

  const errors = await validate(rest);
  if (errors.length) {
    return res
      .status(400)
      .json({ errors: errors.map((error) => error.constraints) });
  }
console.log('idr atay ho?', req.body)
  try {
    const hashedPassword = await bcrypt
      .hash(rest.password, 10)
      .then((value) => value);

    rest["password"] = hashedPassword;

    const userPayload = { "email": rest.email,
    "password":rest.password,
    "username":rest.username,
    "role":rest.role}

    console.log('idr atay ho?222',userPayload)
    const result:any = await User.create({...userPayload});

    
    if (rest.role === 'Teacher') {
      // Check if subjectName is provided
      if (!subjectName) {
        return res.status(400).json({ message: 'Subject name is required for teachers.' });
      }

      // Find or create the subject
      let subject;
      try {
        subject = await Subject.findOne({ where: { name: subjectName } });
      } catch (findError) {
        console.error('Error finding subject:', findError);
        return res.status(500).json({ message: 'Error finding subject', error: findError });
      }

      if (!subject) {
        try {
          subject = await Subject.create({ name: subjectName });
        } catch (createError) {
          console.error('Error creating subject:', createError);
          return res.status(500).json({ message: 'Error creating subject', error: createError });
        }
      }

      // Create the association in the TeacherSubject table
      try {
        //@ts-ignore
        await TeacherSubject.create({ userId: result.id, subjectId: subject.id });
      } catch (assocError) {
        console.error('Error creating teacher-subject association:', assocError);
        return res.status(500).json({ message: 'Error creating teacher-subject association', error: assocError });
      }
    }

    if(rest.role === 'Student'){
      let subjects = await Subject.findAll()
      const studentSubjects = subjects.map((subject:any)=>({
        userId: result.id,
        subjectId:subject.id
      }))
      await StudentSubject.bulkCreate(studentSubjects)
    }
    ///



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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.toJSON().password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.toJSON().id, email: user.toJSON().email },
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
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const getTeachers = async (req:Request, res:Response) => {
  try {
    const teachers = await User.findAll({
      where: { role: 'Teacher' },
      include: [
        {
          model: Subject,
          through: { attributes: [] }, // Exclude the junction table attributes
          attributes: ['id', 'name'],  // Specify the attributes you want to include from the Subject model
        }
      ],
      attributes: ['id', 'username', 'email'] // Specify the attributes you want to include from the User model
    });

    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}

export const getStudents = async (req:Request,res:Response) => {
  try{
   const students = await User.findAll({
      where:{
        role:'Student'
      
      },
      include:{
        model: Subject,
        through: {attributes:[]},
        attributes:['name']
      },
      attributes:['username','email','role']
    })

    res.status(200).json({students})
  }catch(e){

  }
}
