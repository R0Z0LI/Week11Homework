import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  logIn(@Body() signInDto: Record<string, string>) {
    return this.authService.logIn(signInDto.mail, signInDto.password);
  }
}
