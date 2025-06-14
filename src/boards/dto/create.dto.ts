// import { Admin } from '../../schemas/admin.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: '게시글 제목' })
  title: string;
  @ApiProperty({ example: '내용' })
  content: string;
  @ApiProperty({ example: 'active' })
  status: string;
  // author: Admin; // 작성자 (관리자와 연결)
  @ApiProperty({ example: '설명' })
  description: string;
  @ApiProperty({ example: Date() })
  publishedAtStart: Date; // 게시된 시작 날짜
  @ApiProperty({ example: Date() })
  publishedAtEnd: Date; // 게시된 마감 날짜
}