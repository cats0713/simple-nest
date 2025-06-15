import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export class ResponseDto {
  _id: string;

  name: string;

  email: string;

  userId: string;

  createdAt: string;

  updatedAt: string;

  @Exclude()
  password: string;
}