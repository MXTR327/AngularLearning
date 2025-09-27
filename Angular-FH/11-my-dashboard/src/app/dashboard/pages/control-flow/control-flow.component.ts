import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A' | 'B' | 'F';

@Component({
  selector: 'app-control-flow',
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
})
export class ControlFlowComponent
{
  public frameworks = signal<string[]>([
    'Angular',
    'Vue',
    'Svelte',
    'React',
    'Qwik',
  ]);
  public frameworks2 = signal<string[]>([]);

  public grade = signal<Grade>('A');

  public showContent = signal<boolean>(false);

  public toggleContent()
  {
    this.showContent.update(value => !value);
  }
}
