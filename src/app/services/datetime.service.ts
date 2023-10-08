import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }
  /**
   * @description
   */
  public convertIsoDate(iso_date: string | Date): Date {
    if (typeof iso_date === 'string') {
      return new Date(iso_date);
    }
    return iso_date;
  }

  /**
   * @description
   */
  public convertDateForReader(date: string ): string {
    try {
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();

      let diff_timestamp = (dateObj.getTime() - new Date().getTime()) / 1000;
  
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
    } catch(e) {
      return `Not specified`;
    }
  
  }

  /**
   * @description
   */
  public is_today(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  /**
   * @description
   */
  public is_tomorrow(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    const today = new Date();
    return date.getDate() === today.getDate() + 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  /**
   * @descriptionLa date est dans le futur, dans plus de deux jours : JJ.MM.AA
   */
  public is_future(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    const today = new Date();
    return date !== null;
  }

  /**
   * @description
   */
  public is_passed(date: string | Date): boolean {
    date = this.convertIsoDate(date);
    const today = new Date();
    return date.getDate() < today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  /**
   * @description: 
   * @param: $seconds -> number
   * @return: $minute:$second -> 00:00 -> string
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

