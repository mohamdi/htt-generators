import {formatDate} from "@angular/common";
import {RoleEnum} from "../../models/role-enum";
import {dateFormat, dateTimeFormat, locale} from "./contants";

export type DatePickerDate = { day: number; month: number; year: number };
export default class Utils {

  static localDateToDatePickerDate(date: string) {
    const dateSplit = date.split("-");
    return {
      day: parseInt(dateSplit[2], 10),
      month: parseInt(dateSplit[1], 10),
      year: parseInt(dateSplit[0], 10)
    };
  }

  static dateToDatePickerDate(date: Date): DatePickerDate {
    date = new Date(date);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  }

  static datePickerDateToDate(date: DatePickerDate): Date {
    const localDate = new Date();
    localDate.setFullYear(date.year);
    localDate.setMonth(date.month - 1);
    localDate.setDate(date.day);
    return localDate;
  }

  // @ts-ignore
  static compareDate(filterLocalDateAtMidnight, cellValue) {
    let dateAsString = cellValue;
    if (dateAsString == null) return -1;
    let dateParts = dateAsString.split('-');
    let cellDate = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  }

  static formDate(date: string){
    return formatDate(date, dateFormat, locale);
  }
  static formatDateTime(dateTime:string){
    return formatDate(dateTime, dateTimeFormat, locale);
  }

  // @ts-ignore
  static getRoleNameFromKey(role: RoleEnum){
    for(let r in RoleEnum) {
      // @ts-ignore
      if(RoleEnum[r] == role)
        return r;
    }
  }

  static getBase64(file): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

}
