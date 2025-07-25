import { Pipe, type PipeTransform } from '@angular/core';

@Pipe( {
  name: 'toggleCase',
} )
export class ToggleCasePipe implements PipeTransform
{
  transform( value: string, upper: boolean = true ): string
  {
    console.log( { value, upper } );
    return upper ? value.toUpperCase() : value.toLowerCase();
  }

}
