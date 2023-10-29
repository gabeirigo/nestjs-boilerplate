import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from './model/UserFromJwt';
import { UserPayload } from './model/UserPayload';

@Injectable()
export class JwtCognitoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    console.log(payload, 'payload');
    return { awsId: payload.username };
  }
}
