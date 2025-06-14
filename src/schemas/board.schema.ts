import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Admin } from './admin.schema';

export type BoardDocument = Board & Document;

@Schema({ timestamps: { createdAt: 'createdDate', updatedAt: 'updateDate' } })
export class Board {
  @Prop({ required: true })
  seq: number;
  @Prop({ required: true })
  title: string; // 제목

  @Prop({ required: true })
  content: string; // 내용

  @Prop({
    enum: ['active', 'inactive', 'suspended', 'deleted'],
    default: 'active',
  })
  status: string;

  // @Prop({ ref: 'Admin' })
  // author: Admin; // 작성자 (관리자와 연결)

  @Prop()
  description: string;

  @Prop({ type: Number, default: 0 })
  views: number; // 조회수

  @Prop({ type: Date, default: Date.now })
  publishedAtStart: Date; // 게시된 시작 날짜

  @Prop({ type: Date, default: Date.now })
  publishedAtEnd: Date; // 게시된 마감 날짜
}

export const BoardSchema = SchemaFactory.createForClass(Board);