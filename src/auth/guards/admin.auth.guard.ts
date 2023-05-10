import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthGuard
  extends AuthGuard(['user-jwt'])
  implements CanActivate
{
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    if (!result) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token);
    const isAdmin = decoded?.admin;
    if (isAdmin) {
      return true;
    } else {
      return false;
    }
  }
}
