// import { Admin } from '../../schemas/admin.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto {
  @ApiProperty({ example: '6815fe49639ca12c6538a91d' })
  _id: string;
  @ApiProperty({ example: '게시글 제목' })
  title: string;
  @ApiProperty({ example: '내용' })
  content: string;
  @ApiProperty({ example: 'deleted' })
  status: string;
  // author: Admin; // 작성자 (관리자와 연결)
  @ApiProperty({ example: '설명' })
  description: string;
}