import { ApiException } from 'src/exceptions/api.exception';

export class NotFoundException extends ApiException {
  constructor(message?: string) {
    super({
      code: 'ERR-404',
      status: 404,
      message: 'Not found' || message,
    });
  }
}

export class UnauthorizedException extends ApiException {
  constructor(message?: string) {
    super({
      code: 'ERR-401',
      status: 401,
      message: 'Unauthorized' || message,
    });
  }
}

export class ForbiddenException extends ApiException {
  constructor(message?: string) {
    super({
      code: 'ERR-403',
      status: 403,
      message: 'Forbidden' || message,
    });
  }
}
