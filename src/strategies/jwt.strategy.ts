// src/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'very-secret-key', // Replace with your secret
    });
  }

  async validate(payload: any) {
    // Ensure the payload has userId and username, then attach it to request
    const user = await this.userModel.findById(payload.userId)
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user; // This will be available in `req.user`
  }
}
