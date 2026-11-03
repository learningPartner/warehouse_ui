import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL_CONSTANT } from '../../core/constant/global.contant';

@Pipe({
  name: 'readConstant',
})
export class ConstantPipe implements PipeTransform {
  transform(keyName: string): string {
    debugger;
    const validationTextObj = GLOBAL_CONSTANT.VALIDATION_TEXT as any;
    return  validationTextObj[keyName] 
  }
}
