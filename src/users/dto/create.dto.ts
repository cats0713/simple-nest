// import { Admin } from '../../schemas/admin.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '이름' })
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty({ example: 'email@hhhh.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ID' })
  @IsString()
  @Length(1, 30)
  userId: string;

  // author: Admin; // 작성자 (관리자와 연결)
  @ApiProperty({ example: '비밀번호' })
  @IsString()
  password: string;
}