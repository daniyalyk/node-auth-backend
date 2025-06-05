import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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


}