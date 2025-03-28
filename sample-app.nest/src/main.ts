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
  // console.log(document);
  SwaggerModule.setup('api', app, document);

  // Включение CORS с настройками по умолчанию
  app.enableCors();

  // Или с кастомными настройками
  // app.enableCors({
  //   origin: 'https://example.com', // Разрешенный домен
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные HTTP-методы
  //   allowedHeaders: 'Content-Type, Accept', // Разрешенные заголовки
  //   credentials: true, // Разрешить передачу кук и заголовков авторизации
  // });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
