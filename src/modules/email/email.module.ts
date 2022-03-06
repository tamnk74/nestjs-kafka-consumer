import { Module } from '@nestjs/common';
import { EmailService } from './services';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './controllers';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
