import { DateTime } from './datetime';

describe('DateTime', () => {
  describe('format', () => {
    it('should return format datetime', () => {
      const now = new Date();
      const formatedDate = DateTime.format(now);
      expect(typeof formatedDate === 'string').toBeTruthy();
      expect(formatedDate).toEqual(
        `${now.toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })} ${now.toLocaleString('en-ZA', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}`,
      );
    });
  });
});
