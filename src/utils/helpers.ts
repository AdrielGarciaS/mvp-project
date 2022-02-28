import { format } from 'date-fns';

export const parseDateToApi = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};
