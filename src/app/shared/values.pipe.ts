import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
//takes an object and converts its properties and values to an array so you can use it with *ngFor
export class ValuesPipe implements PipeTransform {

  transform(value: any, args?: any[]): Object[] {
    //create instance vars to store keys and final output
    //console.log(value);
    let keyArr: any[] = Object.keys(value),
        dataArr = [],
        keyProp = args[0] ? args[0] : 'key';
    if(args[1]) {
      keyArr.sort();
    }
    //loop through the object,
    //pushing values to the return array
    keyArr.forEach((key:any) => {
      if (key != "body" && key != "timestamp") {
        let retObj = {
          childValue: value[key]
        };
        //converts camelCase to Whatever This Is
        //the hope is that all the keys are in camelCase
        retObj[keyProp] = key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
        dataArr.push(retObj);

      }
    });
    return dataArr;
  }

}
