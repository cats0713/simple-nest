import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseDto } from './dto/response.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  async login(
    @Body() loginDto: LoginDto
  ): Promise<ResponseDto> {
    return this.usersService.login(loginDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: '회원가입' })
  async signin(
    @Body() createUserDto: CreateUserDto
  ): Promise<Boolean> {
    return this.usersService.signin(createUserDto);
  }
}
