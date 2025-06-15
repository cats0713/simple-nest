// import { Admin } from '../../schemas/admin.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ example: '6815fe49639ca12c6538a91d' })
  @IsString()
  _id: string;

  @ApiProperty({ example: '게시글 제목' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: '내용' })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({ example: 'deleted' })
  @IsOptional()
  @IsString()
  status: string;

  // author: Admin; // 작성자 (관리자와 연결)
  @ApiProperty({ example: '설명' })
  @IsOptional()
  @IsString()
  description: string;
}