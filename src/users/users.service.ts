import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Counter, CounterDocument } from 'src/schemas/counter.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseDto } from './dto/response.dto';

import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Counter.name)
    private readonly counterModel: Model<CounterDocument>,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseDto> {
    const findUsers = await this.userModel.findOne({userId: loginDto.userId}).lean();
    if (!findUsers) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const match = await bcrypt.compare(loginDto.password, findUsers.password);
    if (!match) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }
    return plainToInstance(ResponseDto, findUsers);
  }

  async signin(createUserDto: CreateUserDto): Promise<Boolean> {
    // 비번
    const IsId = await this.userModel.findOne({userId: createUserDto.userId})
    const IsEmail = await this.userModel.findOne({email: createUserDto.email})
    if (IsId || IsEmail) {
      throw new BadRequestException('이미 존재하는 ID or email입니다.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const result = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!result) {
      throw new NotFoundException('회원가입 실패');
    }
    return true;
  }
}
