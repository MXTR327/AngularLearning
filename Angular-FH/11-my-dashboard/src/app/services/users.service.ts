import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  User,
  UserResponse,
  UsersResponse,
} from '@interfaces/req-response.interface';
import { delay, map } from 'rxjs';

interface State
{
  loading: boolean;
  users: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService
{
  #state = signal<State>({
    loading: true,
    users: [],
  });

  public loading = computed(() => this.#state().loading);

  public users = computed(() => this.#state().users);
  #http = inject(HttpClient);

  constructor()
  {
    this.#http
      .get<UsersResponse>('https://reqres.in/api/users')
      .pipe(delay(1500))
      .subscribe(res =>
      {
        this.#state.set({
          loading: false,
          users: res.data,
        });
      });
  }

  getUserById(id: string)
  {
    return this.#http
      .get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(
        delay(1500),
        map(resp => resp.data)
      );
  }
}
