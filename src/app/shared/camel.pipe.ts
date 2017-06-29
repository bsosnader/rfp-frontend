import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camel'
})
export class CamelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //converts camelCase to Whatever This Is
    return value.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  }

}
