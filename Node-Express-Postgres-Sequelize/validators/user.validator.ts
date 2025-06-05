import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserValidator {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    subjectName: string;

    @IsNotEmpty()
    @IsEnum(['Teacher', 'Student'], {
        message: 'Role must be either Teacher or Student',
      })
    role: string;


}