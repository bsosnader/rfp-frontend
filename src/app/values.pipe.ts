import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(value: any, args?: any[]): Object[] {
    //create instance vars to store keys and final output
    let keyArr: any[] = Object.keys(value),
        dataArr = [],
        keyProp = args[0] ? args[0] : 'key';
    if(args[1]) {
      keyArr.sort();
    }
    //loop through the object,
    //pushing values to the return array
    keyArr.forEach((key:any) => {
      if (key != "body") {
        let retObj = {
          childValue: value[key]
        };
        retObj[keyProp] = key;
        dataArr.push(retObj);

      }
    });
    return dataArr;
  }

}
