import { Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guards';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { AuthService } from './auth/services/auth.service';
import config from './config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private authService:AuthService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req){
    return req.user;
  }

}
