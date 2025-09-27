import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-view-transition',
  imports: [TitleComponent],
  template: `
    <app-title title="View Transition" />
    <section class="flex justify-start">
      <img
        srcset="http://picsum.photos/id/237/200/300"
        alt="Picsum"
        width="200"
        height="300"
        style="view-transition-name: hero1"
      />

      <div
        class="h-56 w-56 bg-blue-500"
        style="view-transition-name: hero2"
      ></div>
    </section>
  `,
})
export class ViewTransitionComponent1
{}
