import { UtilsService } from '.';

describe('UtilService', () => {
  it('generateRandomInteger should return random number between 1 and 100', () => {
    const result = UtilsService.generateRandomInteger(1, 100);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('generateRandomString should return random string', () => {
    const result = UtilsService.generateRandomString(36);
    expect(result).toEqual(result);
  });

  it('splitModuleFromUrl should return module', () => {
    const result = UtilsService.splitModuleFromUrl('/api/v1/todos');
    expect(result).toEqual('todos');
  });

  it('splitModuleFromUrl should return module when path have id', () => {
    const result = UtilsService.splitModuleFromUrl('/api/v1/todos/1');
    expect(result).toEqual('todos');
  });

  it('splitModuleFromUrl should return module when path have query param', () => {
    const result = UtilsService.splitModuleFromUrl('/api/v1/todos?key=1');
    expect(result).toEqual('todos');
  });

  it("splitModuleFromUrl should return module when we don't define version", () => {
    const result = UtilsService.splitModuleFromUrl('/api/todos');
    expect(result).toEqual('todos');
  });
});
