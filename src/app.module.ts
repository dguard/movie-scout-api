import { Module } from '@nestjs/common';
import { MovieModule } from "./movie";
import { ConfigModule } from '@nestjs/config';

import { WinstonModule } from 'nest-winston';
import LoggerConfig from './logger.config';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MovieModule,
    WinstonModule.forRoot(logger.console())
  ],
})
export class AppModule {}
