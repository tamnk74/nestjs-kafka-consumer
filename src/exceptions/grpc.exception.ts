import { Metadata } from '@grpc/grpc-js';
import { HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ApiException } from '.';

export class GrpcException extends RpcException {
  public override message!: string;
  public metadata: Metadata | undefined;

  constructor(exception: RpcException | HttpException | ApiException | Error) {
    super(exception);
    this.message = 'RpcException';

    if (exception instanceof ApiException) {
      this.setMetadata(exception);
      return;
    }

    if (exception instanceof HttpException) {
      const res = (exception as HttpException).getResponse();
      this.setMetadata(
        new ApiException({
          status: exception.getStatus(),
          code: `ERR-${exception.getStatus()}`,
          message: typeof res === 'string' ? res : (res as Error).message,
        }),
      );
      return;
    }

    if (exception instanceof RpcException) {
      const err = (exception as RpcException).getError();
      this.setMetadata(
        new ApiException({
          status: 400,
          code: 'ERR-400',
          message: typeof err === 'string' ? err : (err as Error).message,
        }),
      );
      return;
    }

    this.setMetadata(
      new ApiException({
        status: 500,
        code: 'ERR-500',
        message:
          typeof exception === 'string'
            ? exception
            : (exception as Error).message,
      }),
    );
  }

  setMetadata(error: ApiException): void {
    this.metadata = new Metadata();
    this.metadata.add('STATUS', `${error.getStatus()}`);
    this.metadata.add('CODE', error.code);
    this.metadata.add('MESSAGE', error.message);
  }
}
