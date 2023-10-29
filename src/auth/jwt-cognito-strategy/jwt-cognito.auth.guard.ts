import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
import { IS_PUBLIC_KEY } from './cognito-no-authentication.decorator';
@Injectable()
export class JwtCognitoAuthGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      const payload = await this.validateAccessToken(token);

      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException('Access token não é um token válido');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validateAccessToken(token: string) {
    const tokenValidationUrl = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

    const { data } = await this.httpService.axiosRef.get(tokenValidationUrl, {
      headers: { 'Content-Type': 'application/json' }
    });

    const keys = data.keys;
    const pems = {};

    keys.forEach((key: any) => {
      const keyType = key.kty;
      const modulus = key.n;
      const exponent = key.e;

      const keyId = key.kid;
      const jwk = { kty: keyType, n: modulus, e: exponent };
      const pem = jwkToPem(jwk);
      pems[keyId] = pem;
    });

    const decodedJwt = jwt.decode(token, { complete: true });

    if (!decodedJwt) {
      throw new UnauthorizedException('Access token não é um token válido');
    }

    const kid = decodedJwt['header'].kid;
    const pem = pems[kid];

    if (!pem) {
      throw new UnauthorizedException('Access token não é um token válido');
    }

    return jwt.verify(token, pem, (err: any) => {
      if (err) {
        throw new UnauthorizedException('Access token não é um token válido');
      } else {
        return decodedJwt.payload;
      }
    });
  }
}
