import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateUserDto{

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    name:string;

    lastName:string;

    role:string;
}