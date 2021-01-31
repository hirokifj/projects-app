import dayjs from '@/lib/dayjs';

export const formatDate = (date: Date): string =>
  dayjs(date).format('YYYY/MM/DD HH:mm');

export const getCurrentUnixtime = (): number => dayjs().unix();
