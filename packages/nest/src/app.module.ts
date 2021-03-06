import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationService } from './validation/validation.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ValidationService],
})
export class AppModule {}
