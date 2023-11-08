import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(helmet());
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new ErrorFilter());

  await app.listen(config.get('PORT'));
}

bootstrap();
