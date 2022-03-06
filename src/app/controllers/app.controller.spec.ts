import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '.';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getApp()', () => {
    it('should return OK', async () => {
      const rs = await appController.getApp();
      expect(rs).toEqual('OK');
    });
  });
});
