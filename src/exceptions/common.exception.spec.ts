import {
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '.';

it('NotFoundException should return instance', () => {
  expect(new NotFoundException('not found')).toBeInstanceOf(NotFoundException);
});

it('UnauthorizedException should return instance', () => {
  expect(new UnauthorizedException('unauthorized')).toBeInstanceOf(
    UnauthorizedException,
  );
});

it('ForbiddenException should return instance', () => {
  expect(new ForbiddenException('Forbidden')).toBeInstanceOf(
    ForbiddenException,
  );
});
