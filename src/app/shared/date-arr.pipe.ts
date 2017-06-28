import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateArr',
})
export class DateArrPipe extends DatePipe implements PipeTransform {


  transform(value: any, args?: any): any {
    let formattedArr = [];
    for (let date of value) {
      formattedArr.push(super.transform(date, 'yyyy-MM-dd'))
    }
    return formattedArr;
  }

}
