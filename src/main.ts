import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'; // ✅ 추가
import { join } from 'path'; // ✅ join 함수 사용

import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  // ✅ Express 기반 Nest 애플리케이션으로 설정
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Nest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ 정적 파일 서빙
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // dto 파이프 처리 부분
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
