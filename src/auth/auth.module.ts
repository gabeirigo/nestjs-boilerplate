import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/resources/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtCognitoStrategy } from './jwt-cognito-strategy/jwt-cognito-strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '365d'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtCognitoStrategy, JwtService]
})
export class AuthModule {}
