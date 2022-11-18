import { Injectable } from '@nestjs/common';
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
    console.log({
      email:email,
      pass:pass
    })
    const user = await this.userService.findOneByEmail(email);
    const passwordMatch = await bcrypt.compare(pass,user.password);
    if (user && passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user:User){
    const payload = {email:user.email, sub:user.id, role:user.role }
    return {
      access_token:this.jwtService.sign(payload)
    };
  }
}
