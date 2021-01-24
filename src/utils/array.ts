export const isNonEmptyArray = (arr: unknown[]): boolean => arr.length > 0;

export const isEmptyArray = (arr: unknown[]): boolean => !isNonEmptyArray(arr);

export const take = (num: number) => {
  if (!Number.isFinite(num) && num <= 1) throw new Error('invalid argument');

  return <T>(arr: T[]) => arr.slice(0, num);
};
