// src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Admin, AdminSchema } from '../schemas/admin.schema';
import { Board, BoardSchema } from '../schemas/board.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_DB'),
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Board.name, schema: BoardSchema },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
