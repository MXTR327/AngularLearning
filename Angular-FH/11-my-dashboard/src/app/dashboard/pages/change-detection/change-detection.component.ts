import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  imports: [TitleComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />

    <pre>{{ frameworkAsSignal() | json }}</pre>

    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
})
export class ChangeDetectionComponent
{
  public frameworkAsSignal = signal({ name: 'Angular', releaseDate: 2016 });

  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  );

  public frameworkAsProperty = { name: 'Angular', releaseDate: 2016 };

  constructor()
  {
    setTimeout(() =>
    {
      // this.frameworkAsProperty.name = 'React';
      this.frameworkAsSignal.update(value => ({ ...value, name: 'React' }));

      console.log('Hecho');
    }, 3000);
  }
}
