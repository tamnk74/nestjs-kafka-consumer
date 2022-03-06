import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailMessage } from '../dtos';
import { EmailService } from '../services';

@Controller('')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @MessagePattern('register.account.email')
  findOne(
    @Payload('value') message: EmailMessage,
  ): Promise<string | undefined> {
    return this.emailService.sendRegistrationEmail(message);
  }
}
