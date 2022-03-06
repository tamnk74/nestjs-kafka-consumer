import { Injectable } from '@nestjs/common';
import { EmailMessage } from '../dtos';

@Injectable()
export class EmailService {
  async sendRegistrationEmail(message: EmailMessage): Promise<string> {
    console.log('An email was sent to ' + message.email);
    return 'An email was sent to ' + message.email;
  }
}
