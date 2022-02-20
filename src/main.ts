import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from '@nestjs/config';
const express = require("express");

process.on('unhandledRejection', (err) => {
  throw err;
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/public', express.static([__dirname, '..', 'movie-poster-dataset'].join('/')));

  const configService = app.get(ConfigService);
  app.useWebSocketAdapter(new WsAdapter(app));

  const port = configService.get<number>('PORT');
  console.log(`listening on PORT ${port}`);
  await app.listen(port);
}

bootstrap();
