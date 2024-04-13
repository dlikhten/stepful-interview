import dayjs, { ConfigType, Dayjs, OpUnitType, QUnitType } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export function parseISO(isoString: ConfigType): Dayjs {
  return dayjs(isoString);
}

/**
 * Format a date, but only if the given date is valid
 */
export function formatDate(date: ConfigType, format?: string, elseVal = '') {
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format(format) : elseVal;
}

export function duration(earlierTime: ConfigType, laterTime: ConfigType, unit?: QUnitType | OpUnitType) {
  return dayjs(laterTime).diff(earlierTime, unit);
}

/**
 * datetime-local does not provide a timezone, only a date/time selected. Using this we convert that time
 * to the same exact time, except in the current browser's local timezone.
 *
 * @param date
 */
export function inputDateToZonedDateString(date: ConfigType) {
  if (date) {
    return dayjs(date).tz(dayjs.tz.guess(), true).format();
  } else {
    return '';
  }
}
