import { Module } from '@nestjs/common';
import {ExchangeRateModule} from "./exchange-rate";
import { ConfigModule } from '@nestjs/config';

import { WinstonModule } from 'nest-winston';
import LoggerConfig from './logger.config';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ExchangeRateModule,
    WinstonModule.forRoot(logger.console())
  ],
})
export class AppModule {}
