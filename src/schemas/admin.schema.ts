// src/schemas/bible.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true }) // createdAt, updatedAt 자동 생성
export class Admin {
  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userPW: number;

  @Prop({ required: true })
  pwHash: string;

  @Prop({
    enum: ['superadmin', 'admin', 'moderator'],
    default: 'admin',
  })
  role: string;

  @Prop()
  text: string;

  @Prop({
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  })
  status: string;

  @Prop()
  lastLogin: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);