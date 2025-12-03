import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',   // Izinkan semua frontend mengakses API
    methods: 'GET,POST,PUT,PATCH,DELETE',
  });

  await app.listen(3000);
}
bootstrap();
