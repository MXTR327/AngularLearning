import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-view-transition',
  imports: [TitleComponent],
  template: `
    <app-title title="View Transition" />
    <section class="flex justify-end">
      <img
        srcset="http://picsum.photos/id/237/200/300"
        alt="Picsum"
        width="200"
        height="300"
        style="view-transition-name: hero1"
      />

      <div
        class="fixed right-10 bottom-16 h-32 w-32 rounded bg-blue-800"
        style="view-transition-name: hero2"
      ></div>
    </section>
  `,
})
export class ViewTransitionComponent2
{}
