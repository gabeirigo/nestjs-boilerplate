import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtCognitoAuthGuard } from './auth/jwt-cognito-strategy/jwt-cognito.auth.guard';
import { CompanyModule } from './resources/company/company.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CompanyModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '365d'
      }
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtCognitoAuthGuard
    }
  ]
})
export class AppModule {}
