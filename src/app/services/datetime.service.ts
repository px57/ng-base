import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  /**
   * @name: DatetimeService
   * @description: Service to handle date and time conversions and checks.
   * @example
   * const dateService = new DatetimeService();
   * const isoDate = dateService.convertIsoDate(
   *   '2023-10-01T12:00:00Z'
   * );
   */
  constructor() { }

  /**
   * @name: convertIsoDate
   * @description: Converts an ISO date string or Date object to a Date object.
   * @param iso_date - The ISO date string or Date object to convert.
   * @returns Date object.
   * @example
   * const date = dateService.convertIsoDate(
   *   '2023-10-01T12:00:00Z'
   * );
   */
  public convertIsoDate(iso_date: string | Date): Date {
    if (typeof iso_date === 'string') {
      return new Date(iso_date);
    }
    return iso_date;
  }

  /**
   * @name: convertDateForReader
   * @description: Converts a date string to a human-readable format (Today,
   * Tomorrow, Passed, or MM.DD.YYYY).
   * @param date - The date string to convert.
   * @returns A human-readable string.
   * @example
   * const readable = dateService.convertDateForReader('2023-10-01');
   */
  public convertDateForReader(date: string): string {
    try {
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();

      let diff_timestamp = (
        dateObj.getTime() - new Date().getTime()
      ) / 1000;

      // -> this day is today 
      if (new Date().getDate() === dateObj.getDate()) {
        return `Today`;
      }

      // -> this day is tomorrow
      if (new Date().getDate() + 1 === dateObj.getDate()) {
        return `Tomorrow`;
      }
      
      // -> this day is outdated 
      if (diff_timestamp < 0) {
        return `Passed`;
      }

      return `${month}.${day}.${year}`;
    } catch (e) {
      return `Not specified`;
    }
  }

  /**
   * @name: is_today
   * @description: Checks if the given date is today.
   * @param date - The date string or Date object to check.
   * @returns True if the date is today, false otherwise.
   * @example
   * const isToday = dateService.is_today('2023-10-01');
   */
  public is_today(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * @name: is_tomorrow
   * @description: Checks if the given date is tomorrow.
   * @param date - The date string or Date object to check.
   * @returns True if the date is tomorrow, false otherwise.
   * @example
   * const isTomorrow = dateService.is_tomorrow('2023-10-02');
   */
  public is_tomorrow(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    const today = new Date();
    return (
      date.getDate() === today.getDate() + 1 &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * @name: is_future
   * @description: Checks if the given date is in the future (more than two days
   * ahead).
   * @param date - The date string or Date object to check.
   * @returns True if the date is in the future, false otherwise.
   * @example
   * const isFuture = dateService.is_future('2023-10-05');
   */
  public is_future(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    return date !== null;
  }

  /**
   * @name: is_passed
   * @description: Checks if the given date has already passed.
   * @param date - The date string or Date object to check.
   * @returns True if the date has passed, false otherwise.
   * @example
   * const isPassed = dateService.is_passed('2023-09-30');
   */
  public is_passed(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    const today = new Date();
    return (
      date.getDate() < today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * @name: convertSecondsToMinutes
   * @description: Converts seconds to a string in MM:SS format.
   * @param seconds - The number of seconds to convert.
   * @returns The formatted time string.
   * @example
   * const time = dateService.convertSecondsToMinutes(125); // "02:05"
   */
  public convertSecondsToMinutes(seconds: number): string {
    let minutes = String(Math.floor(seconds / 60));
    let second = String(seconds % 60);

    if (second.length === 1) {
      second = `0${second}`;
    }

    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }
    
    return `${minutes}:${second}`;
  }
}

