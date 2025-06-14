// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { Board, BoardDocument } from '../schemas/board.schema';

// 더미 데이터
import { faker } from '@faker-js/faker';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  createFakeBoard() {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      description: faker.lorem.sentences(2),
      status: faker.helpers.arrayElement(['active', 'inactive', 'suspended', 'deleted']),
      views: faker.number.int({ min: 0, max: 500 }),
      publishedAtStart: faker.date.recent(),
      publishedAtEnd: faker.date.recent(),
    };
  }
  async seed() {
    const adminCount = await this.adminModel.estimatedDocumentCount();
    if (adminCount === 0) {
      await this.adminModel.create({
        userID: 'test',
        userName: 'admin',
        userPW: '1234',
        pwHash: '123$',
      });
      console.log('[Seed] Admin 생성 완료');
    }

    const boardCount = await this.boardModel.estimatedDocumentCount();
    if (boardCount === 0) {
      const boards = Array.from({ length: 20 }).map(() => this.createFakeBoard());
      await this.boardModel.create(boards);
      console.log('[Seed] Board 생성 완료');
    }
  }
}
