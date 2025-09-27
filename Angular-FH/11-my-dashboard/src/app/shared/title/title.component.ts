import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `
    <h1 class="mb-5 text-3xl">{{ title() }} - {{ withShadow() }}</h1>
  `,
})
export class TitleComponent
{
  public title = input.required<string>();

  public withShadow = input(false, { transform: booleanAttribute });
}
