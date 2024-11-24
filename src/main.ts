import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Origine de l'application Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes autorisées
    credentials: true, // Cookies ou autorisations HTTP
  });
  await app.listen(3000);
}
bootstrap();
dotenv.config();
