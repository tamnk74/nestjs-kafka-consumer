import { Catch, HttpException, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { GrpcException } from './grpc.exception';

@Catch()
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException | HttpException): Observable<unknown> {
    const grpcException = new GrpcException(exception);
    return throwError(() => grpcException);
  }
}
