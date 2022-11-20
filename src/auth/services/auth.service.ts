import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if(!user){
      throw new NotFoundException("User not found, please register")
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (passwordMatch) {
      const { ...result } = user;
      return result;
    }
    throw new NotFoundException("Combination user and password not found")
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
