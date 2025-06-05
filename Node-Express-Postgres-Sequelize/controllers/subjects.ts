import { Request, Response } from "express";
import Subject from "../models/subject";
import {SubjectValidator} from '../validators/subject.validator'
import { validate } from "class-validator";
import { isError } from "lodash";


const createSubject = async(req:Request,res:Response)=>{

    const subject = new SubjectValidator();
    Object.assign(subject, req.body);
  
    const errors = await validate(subject);
    if (errors.length) {
      return res
        .status(400)
        .json({ errors: errors.map((error) => error.constraints) });
    }

    try{

       const result = await Subject.create({...subject})
       if (isError(result)) throw result;

       return res.status(201).json({
        message: "Successfully created product"
      });

    }catch(err){
    res.status(500).json({ error: "Internal server error" });

    }

}

export {createSubject}