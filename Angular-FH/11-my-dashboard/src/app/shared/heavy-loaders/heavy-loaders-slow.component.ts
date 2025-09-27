import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [],
  template: `
    <section class="h-[600px] w-full" [class]="cssClass()">
      Heavy Loader Slow
    </section>
  `,
})
export class HeavyLoadersSlowComponent
{
  public cssClass = input.required<string>();

  constructor()
  {
    const start = Date.now();
    while (Date.now() - start < 3000)
    {
      //
    }
    console.log('Cargado');
  }
}
