import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log({ NODE_ENV: process.env.NODE_ENV });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
