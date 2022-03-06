import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/modules/email';
import { AppController } from './controllers';
import { LoggerModule } from 'src/common/logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    EmailModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
