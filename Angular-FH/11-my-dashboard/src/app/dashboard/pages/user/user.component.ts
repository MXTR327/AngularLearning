import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  template: `
    <app-title [title]="titleLabel()" />
    @if (user()) {
      <section>
        <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />

        <div>
          <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
          <p>{{ user()?.email }}</p>
        </div>
      </section>
    } @else {
      <p>Cargando informacion</p>
    }
  `,
})
export class UserComponent
{
  public titleLabel = computed(() =>
  {
    if (this.user())
    {
      return `Informacion del usuario: ${this.user()?.first_name}
      ${this.user()?.last_name}`;
    }

    return 'Informacion del usuario';
  });

  #route = inject(ActivatedRoute);

  #userService = inject(UsersService);

  public user = toSignal(
    this.#route.params.pipe(
      switchMap(({ id }) => this.#userService.getUserById(id))
    )
  );

  // constructor()
  // {
  //   this.#route.params.subscribe(params =>
  //   {
  //     console.log({ params });
  //   });
  // }
}
