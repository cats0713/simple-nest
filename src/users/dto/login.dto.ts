// import { Admin } from '../../schemas/admin.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'userID' })
  @IsString()
  @Length(1, 30)
  userId: string;

  // author: Admin; // 작성자 (관리자와 연결)
  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}