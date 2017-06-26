import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aggs'
})
export class AggsPipe implements PipeTransform {

  transform(value: any, args: string): any {
    console.log(args);
    let bucketsArr = [];
    if (args) {
      for(let x of value.aggregations[args].buckets) {
        bucketsArr.push(x.key)
      }
    }
    return bucketsArr;
  }

}
