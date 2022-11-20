import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    readonly name:string;

    @IsString()
    readonly lastName:string;

    @IsNumber()
    readonly roleId:number;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}