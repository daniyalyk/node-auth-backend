import { IsNotEmpty, IsString } from 'class-validator'

export class SubjectValidator {
    @IsString()
    @IsNotEmpty()
    name:string;

}