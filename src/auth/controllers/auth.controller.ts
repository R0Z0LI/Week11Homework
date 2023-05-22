import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

export class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto.email, loginDto.password);
  }
}
