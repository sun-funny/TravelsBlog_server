import { Injectable } from '@nestjs/common';
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import { jwtConstants } from 'src/static/constants';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    async validate(payload: any) {
    console.log('JWT payload', payload);
    return { 
        userId: payload.sub, 
        login: payload.login,
        role: payload.role 
    };
    }
}