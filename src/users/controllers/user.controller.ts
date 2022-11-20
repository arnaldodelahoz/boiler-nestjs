import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dtos';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {

    constructor(private userService:UserService){}
    
    @Get("/get-by-email")
    async findByEmail(){
    }

    @Post()
    async create(@Body() userDto:CreateUserDto){
        return this.userService.create(userDto);
    }
    
}
