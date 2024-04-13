import { formatDate, parseISO } from 'concerns/date_parsing';
import dayjs from 'dayjs';

type FormatDateProps = {
  date: dayjs.ConfigType;
  format: string;
};
export function FormatDate({ date, format }: FormatDateProps) {
  const parsedDate = parseISO(date);
  return <>{formatDate(parsedDate, format)}</>;
}

FormatDate.LongForm = function LongForm({ date }: { date: dayjs.ConfigType }) {
  return <FormatDate date={date} format="MM/DD/YYYY hh:mm A z" />;
};
