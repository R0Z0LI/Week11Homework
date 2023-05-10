import { Module } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: '28edc76d4fd8c9fcd64e222a8fcc6210bcdeafa1',
      signOptions: { expiresIn: '900s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy],
})
export class AuthModule {}
