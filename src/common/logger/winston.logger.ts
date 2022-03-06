import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

export class WinstonLogger implements LoggerService {
  public readonly logger: winston.Logger;
  constructor() {
    const transports: winston.transport[] = [new winston.transports.Console()];
    if (
      process.env['NODE_ENV'] !== 'local' &&
      process.env['NODE_ENV'] !== 'test'
    ) {
      const loggingWinston = new LoggingWinston();
      transports.push(loggingWinston);
    }

    this.logger = winston.createLogger({
      level: 'info',
      transports,
    });
  }

  public log(message: string, context: unknown): winston.Logger {
    return this.logger.info(message, context);
  }

  public error(message: string, context: unknown): winston.Logger {
    return this.logger.error(message, context);
  }

  public warn(message: string, context: unknown): winston.Logger {
    return this.logger.warn(message, context);
  }

  public debug(message: string, context: unknown): winston.Logger {
    return this.logger.debug(message, context);
  }

  public verbose(message: string, context: unknown): winston.Logger {
    return this.logger.verbose(message, context);
  }
}
