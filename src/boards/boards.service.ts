import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Board, BoardDocument } from '../schemas/board.schema';
import { Counter, CounterDocument } from '../schemas/counter.schema';

import { CreateBoardDto } from './dto/create.dto';
import { UpdateBoardDto } from './dto/update.dto';


@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private readonly boardModel: Model<BoardDocument>,
    @InjectModel(Counter.name)
    private readonly counterModel: Model<CounterDocument>,
  ) {}

  async getAllBoards(): Promise<BoardDocument[]> {
    const findBoards = await this.boardModel.find().lean().exec();
    if (!findBoards) {
      throw new NotFoundException('게시물 찾기 실패');
    }
    return findBoards;
  }

  async getOneBoards(id: string): Promise<BoardDocument> {
    const findBoard = await this.boardModel.findById(id);
    if (!findBoard) {
      throw new NotFoundException('게시물 찾기 실패');
    }
    return findBoard;
  }

  async createBoards(createBoardDto: CreateBoardDto): Promise<BoardDocument> {
    const boardId = await this.counterModel.findOneAndUpdate(
      { name: 'boardId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    const boardWithId = {
      ...createBoardDto,
      seq: boardId.seq,
    };
    const result = await this.boardModel.create(boardWithId);
    if (!result) {
      throw new NotFoundException('새로운 게시물 생성 실패');
    }
    return result;
  }

  async deleteBoards(updateBoardDto: UpdateBoardDto): Promise<BoardDocument> {
    const deleted = await this.boardModel.findByIdAndDelete(updateBoardDto._id);
    if (!deleted) {
      throw new NotFoundException('게시물 삭제 실패');
    }
    return deleted;
  }

  async updateBoards(updateBoardDto: UpdateBoardDto): Promise<BoardDocument> {
    const update = await this.boardModel.findByIdAndUpdate(
      updateBoardDto._id,
      updateBoardDto,
    );
    if (!update) {
      throw new NotFoundException('게시물 업데이트 실패');
    }
    return update;
  }
}
