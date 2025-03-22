import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Пример API')
    .setDescription('Описание API')
    .setVersion('1.0')
    .addTag('пример')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  console.log(document); // Логируем документ Swagger
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe()); // Подключение ValidationPipe

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
