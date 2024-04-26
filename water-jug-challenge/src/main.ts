import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Main');
const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger config
  const config = new DocumentBuilder()
  .setTitle('Water Jug API')
  .setDescription('Water Jug Challenge API description.')
  .setVersion('1.0')
  .addTag('water-jug-challenge')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  logger.log(`App listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
