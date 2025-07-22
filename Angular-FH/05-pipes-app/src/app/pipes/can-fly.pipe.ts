import { Pipe, type PipeTransform } from '@angular/core';

@Pipe( {
  name: 'canFly',
} )
export class CanFlyPipe implements PipeTransform
{
  transform( value: boolean ): 'Puede Volar' | 'No Puede Volar'
  {
    return value ? 'Puede Volar' : 'No Puede Volar';
  }
}
