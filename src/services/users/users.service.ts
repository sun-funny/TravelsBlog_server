import {BadRequestException, Delete, Get, Injectable, Param, Post, Put, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { User, UserDocument } from 'src/shemas/user';
import * as bcrypt from 'bcrypt';
import {UserDto} from "../../dto/user-dto";
import {JwtService} from "@nestjs/jwt";
import { IResponseUser, IUser } from 'src/interface/user';
import {Request} from "express";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {
        console.log('userService run')
    }


    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id).exec();
        return user;
    }

    async registerUser(user: IUser): Promise<boolean> {
        const defaultRole ='user';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.psw, salt);
        const newUser:IUser = {...user, psw: hashedPassword, role: defaultRole };
        const userData = new this.userModel(newUser);
        userData.save();

        return Promise.resolve(true);
    }

    async updateUsers(id: string, user: IUser): Promise<User | null> {
        const salt = await bcrypt.genSalt();
        const hashedPsw = await bcrypt.hash(user.psw, salt);
        const hashUser = Object.assign({}, user, { psw: hashedPsw });
        return this.userModel.findByIdAndUpdate(id, hashUser);
    }

    async deleteUsers(): Promise<any> {
        return this.userModel.deleteMany()
    }

    async  deleteUserById(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id);
    }

    async checkAuthUser(login: string, psw: string): Promise<User[]> {
        const user = await this.userModel.findOne({ login }).exec();
        if (!user) {
            throw new BadRequestException('Логин указан неверно');
        }
        const isMatch: boolean = bcrypt.compareSync(psw, user.psw);
        if (!isMatch) {
            throw new BadRequestException('Пароль указан неверно');
        }
        return [user];
    }
    
    async getUserByLogin(login: string): Promise<IUser | null> {
        return this.userModel.findOne({login});
    }
    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    }

    async login(user: IUser): Promise<IResponseUser> {
        const userFromDB = await this.userModel.findOne({login: user.login});
        
        if (!userFromDB) {
            throw new BadRequestException('User not found');
        }
    
        const payload = { 
            login: user.login, 
            sub: userFromDB._id.toString(),
            role: userFromDB.role 
        };
        
        return {
            id: userFromDB._id.toString(),
            access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            role: userFromDB.role
        };
    }

    async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
        try {
          const payload = this.jwtService.verify(refreshToken);
          const newPayload = { 
            login: payload.login, 
            sub: payload.sub,
            role: payload.role 
          };
          return {
            access_token: this.jwtService.sign(newPayload, { expiresIn: '15m' })
          };
        } catch (e) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }

     extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}