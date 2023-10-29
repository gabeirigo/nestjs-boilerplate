import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UnauthorizedError } from 'src/errors/UnauthorizedError';
import { User } from 'src/resources/user/entities/user.entity';
import { UserService } from 'src/resources/user/user.service';
import { UserPayload } from './jwt-strategy/model/UserPayload';
import { UserToken } from './jwt-strategy/model/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(email: string): Promise<UserToken> {
    const user: User = await this.validateUser(email);

    const payload: UserPayload = {
      email: user.email,
      sub: user.id
    };

    return {
      accessToken: this.jwtService.sign(payload),
      email
    };
  }

  private async validateUser(email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      return {
        ...user
      };
    }

    throw new UnauthorizedError('Email or password is incorrect');
  }
}
