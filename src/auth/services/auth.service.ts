import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${user.email} not found`);
    }
    const upDateUser = await this.userService.updateUserLoginDate(user);
    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    if (upDateUser?.password !== passwordHash) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: upDateUser.id,
      email: upDateUser.email,
      admin: upDateUser.isAdmin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: upDateUser.isAdmin,
      suspended: upDateUser.isSuspended,
      id: upDateUser.id,
    };
  }
  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return { isValid: true, payload };
    } catch (err) {
      return { isValid: false };
    }
  }
}
