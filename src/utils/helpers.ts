import { format, parse } from 'date-fns';

export const parseDateToApi = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export const formatAmount = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
  }).format(amount);

  return formattedAmount;
};

export const formatDate = (date: string) => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(parsedDate, 'MM/dd/yyyy');
};
