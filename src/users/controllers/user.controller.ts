import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/get-by-email')
  async findByEmail() {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    console.log({ id, userDto });
    return this.userService.update(id, userDto);
  }
}
