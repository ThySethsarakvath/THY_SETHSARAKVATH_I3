/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Parse JSON bodies
  app.use(require('express').json({ limit: '2mb' }));

  const config = app.get(ConfigService);
  const port = config.get<number>('GATEWAY_PORT') || 3000;

  await app.listen(port);
  console.log(`🚀 API Gateway running on port ${port}`);
  console.log(`📍 Routes available: /api/auth/*, /api/orders/*`);
}
bootstrap();
