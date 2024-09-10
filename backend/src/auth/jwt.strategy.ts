import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Bearer token
      ignoreExpiration: false, // Don't allow expired tokens
      secretOrKey: 'yourSecretKey', // Same secret key as in JwtModule
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Attach user info to the request object
  }
}
