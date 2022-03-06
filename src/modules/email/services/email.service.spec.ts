import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '.';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { of } from 'rxjs';

describe('UserService', () => {
  let userService: UserService;
  let httpService: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [UserService],
    }).compile();

    userService = app.get<UserService>(UserService);
    httpService = app.get(HttpService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('isTokenActive()', () => {
    it('isTokenActive return true', async () => {
      const result = {
        data: { active: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'post').mockImplementation(() => of(result));
      const rs = await userService.isValidToken('token');
      expect(rs).toEqual(true);
    });
  });
});
