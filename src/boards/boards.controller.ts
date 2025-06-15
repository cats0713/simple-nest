import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { BoardDocument } from 'src/schemas/board.schema';

import { CreateBoardDto } from './dto/create.dto';
import { UpdateBoardDto } from './dto/update.dto';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {} // 파라미터 -> 프로퍼티

  @Get()
  @ApiOperation({ summary: '모든게시글 가져오기' })
  async getAllBoard(): Promise<BoardDocument[]> {
    return this.boardsService.getAllBoards();
  }

  @Get(':id')
  @ApiOperation({ summary: '한개의 게시물 가져오기' })
  async getOneBoard(
    @Param('id') id: string
  ): Promise<BoardDocument> {
    return this.boardsService.getOneBoards(id);
  }

  @Post('/create')
  @ApiOperation({ summary: '1개 게시물 생성하기' })
  async createBoard(
    // @Body() body
    // @Body('title') title,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<BoardDocument> {
    return this.boardsService.createBoards(createBoardDto);
  }

  @Post('/delete')
  @ApiOperation({ summary: '게시물 진짜 삭제' })
  async deleteBoard(
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<BoardDocument> {
    return this.boardsService.deleteBoards(updateBoardDto);
  }

  @Post('/update')
  @ApiOperation({ summary: '게시물 업데이트' })
  async updateBoard(
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<BoardDocument> {
    return this.boardsService.updateBoards(updateBoardDto);
  }
}
