import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  logger.log(`App listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
