import { DateFormat, TimeFormat } from '../../constants/enum/dayjs-format';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

function isValidInput(
  value: string | number | undefined,
  dateFormat: DateFormat | null,
  timeFormat: TimeFormat | null
) {
  return (
    !value &&
    dateFormat &&
    Object.values(DateFormat).includes(dateFormat) &&
    timeFormat &&
    Object.values(TimeFormat).includes(timeFormat)
  );
}

export function formatDateTime(
  milliseconds?: number,
  dateStr?: string,
  dateFormat: DateFormat = DateFormat.DEFAULT,
  timeFormat: TimeFormat = TimeFormat.DEFAULT
) {
  const value = milliseconds || dateStr;
  if (isValidInput(value, dateFormat, timeFormat)) {
    return '';
  }

  return dayjs(value).format(dateFormat + ' ' + timeFormat);
}

export function formatDate(
  milliseconds?: number,
  dateStr?: string,
  dateFormat: DateFormat = DateFormat.DEFAULT
) {
  const value = milliseconds || dateStr;
  if (isValidInput(value, dateFormat, null)) {
    return '';
  }

  return dayjs(value).format(dateFormat);
}

export function formatTime(
  milliseconds?: number,
  dateStr?: string,
  timeFormat: TimeFormat = TimeFormat.DEFAULT
) {
  const value = milliseconds || dateStr;
  if (isValidInput(value, null, timeFormat)) {
    return '';
  }

  return dayjs(value).format(timeFormat);
}
