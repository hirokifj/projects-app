// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): value is number =>
  typeof value === 'number';
