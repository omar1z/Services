import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    // const arr = [];
    // for(const ch of value){
    //   arr.push(ch);
    // }
    // arr.reverse();
    // let n = ''
    // for(const a of arr){
    //   n += a
    // }
    // return n;
    return value.split('').reverse().join('');
  }

}
