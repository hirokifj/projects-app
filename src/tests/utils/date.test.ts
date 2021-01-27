import { formatDate } from '@/utils/date';

describe('formatDate function', () => {
  test('should return formatted date string.', () => {
    const date = new Date(2021, 1, 2, 3, 24);
    expect(formatDate(date)).toBe('2021/02/02 03:24');
  });
});
