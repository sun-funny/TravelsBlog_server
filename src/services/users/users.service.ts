import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../shemas/user';
import { UserDto } from '../../dto/user-dto';
import { DeleteResult } from 'mongodb';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              private jwtService: JwtService) {
    console.log('userService run');
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async createUser(data: UserDto): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({ login }).exec();
  }

  async updateUser(id: string, body: Partial<UserDto>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
  }

  async deleteAllUsers(): Promise<DeleteResult> {
    return this.userModel.deleteMany({}).exec();
  }

  async deleteUserById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async checkAuthUser(login: string, psw: string): Promise<User[] | null> {
    const usersArr = await this.userModel.find({login, psw: psw});
    return usersArr.length === 0 ? null : usersArr;
  }

  async login(user: UserDto) {
        const payload = { login: user.login, psw: user.psw};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
  
  async findByLogin(login: string): Promise<User | null> {
    return this.userModel.findOne({ login }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return email ? this.userModel.findOne({ email }).exec() : null;
}
}