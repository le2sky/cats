import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRespository } from 'src/cats/cat.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRespository) {
    super({
      //jwt config
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_secretKey,
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat; //request.user에 cat 넣어줌
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
