// src/seed/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule, {
    logger: false,
  });

  const seeder = app.get(SeedService);
  await seeder.seed();

  await app.close();
}

bootstrap();