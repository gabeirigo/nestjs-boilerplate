import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './jwt-strategy/model/LoginRequestBody';
import { NoAuthentication } from './jwt-strategy/no-authentication.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @NoAuthentication()
  @Post('auth')
  @HttpCode(HttpStatus.OK)
  login(@Body() { email }: LoginRequestBody) {
    return this.authService.login(email);
  }
}
