import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aggs'
})
export class AggsPipe implements PipeTransform {

  transform(value: any, args: string, args2: string): any {
    let bucketsArr = [];

    if (args) {
      for(let x of value.aggregations[args].buckets) {
        if(args2) {
          bucketsArr.push(x.key_as_string);
        } else {
          bucketsArr.push(x.key)
        }

      }
    }
    return bucketsArr;
  }

}
