import { take } from '@/utils/array';

describe('take function', () => {
  test('should return new array includes specified number of elements in the array.', () => {
    const arr = [1, 2, 3];
    expect(take(1)(arr)).toEqual([1]);
    expect(take(2)(arr)).toEqual([1, 2]);
    expect(take(3)(arr)).toEqual([1, 2, 3]);
    expect(take(4)(arr)).toEqual([1, 2, 3]);
  });

  test('should return empty array when zero is given.', () => {
    const arr = [1, 2, 3];
    expect(take(0)(arr)).toEqual([]);
  });

  test('should throw Error when negative number is given.', () => {
    const arr = [1, 2, 3];
    expect(() => {
      take(-1)(arr);
    }).toThrow();
  });

  test('should throw Error when invalid value is given.', () => {
    const arr = [1, 2, 3];
    expect(() => {
      take(NaN)(arr);
    }).toThrow();

    expect(() => {
      take(Infinity)(arr);
    }).toThrow();
  });
});
