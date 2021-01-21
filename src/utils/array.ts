export const isNonEmptyArray = (arr: unknown[]): boolean => arr.length > 0;

export const isEmptyArray = (arr: unknown[]): boolean => !isNonEmptyArray(arr);
