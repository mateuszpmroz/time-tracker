import { MILLIS_IN_SECOND, DATE_FORMAT } from '@app/consts';
import { format } from 'date-fns-tz';

export const formatDate = (
  dateMillis: number,
  dateFormat: string = DATE_FORMAT,
) => format(dateMillis, dateFormat);

export const getDateFromTimestamp = (timestamp: number, dateFormat?: string) =>
  formatDate(timestamp, dateFormat);

/**
 * @param seconds
 * @returns HH:MM:SS time string format
 */
export const formatSecondsToTimeString = (seconds: number) =>
  new Date(seconds * MILLIS_IN_SECOND).toISOString().substring(11, 19);
