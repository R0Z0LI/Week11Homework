import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

export class LoginDto {
  email: string;
  password: string;
}

export class ValidateTokenDto {
  token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto.email, loginDto.password);
  }

  @Post('validate_token')
  async validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    const result = await this.authService.validateToken(validateTokenDto.token);
    if (!result.isValid) {
      throw new UnauthorizedException();
    }
    return result.payload;
  }
}
