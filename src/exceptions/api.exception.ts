import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type ErrorProps = {
  code: string;
  message: string;
  status: number;
  stack?: string;
};

export class ApiException extends HttpException {
  public code: string;
  public override message: string;
  public override stack?: string;

  constructor({ message, code, status }: ErrorProps) {
    super(message, status);
    this.message = message;
    this.code = code;
  }

  toJSON(): ErrorProps {
    const configService = new ConfigService();
    return {
      status: this.getStatus(),
      code: this.code,
      message: this.message,
      stack: !['staging', 'production'].includes(
        configService.get('NODE_ENV') as string,
      )
        ? this.stack
        : undefined,
    };
  }
}
