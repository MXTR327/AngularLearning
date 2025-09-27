import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'authenticated' | 'checking' | 'not-authenticated';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService
{
  authStatus = computed<AuthStatus>(() =>
  {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  private _user = signal<null | User>(null);
  isAdmin = computed<boolean>(
    () => this._user()?.roles.includes('admin') ?? false
  );

  private _token = signal<null | string>(localStorage.getItem('token'));

  token = computed(this._token);

  user = computed<null | User>(() => this._user());

  private _authStatus = signal<AuthStatus>('checking');

  private http = inject(HttpClient);

  checkStatus(): Observable<boolean>
  {
    const token = localStorage.getItem('token');

    if (!token)
    {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError(error => this.handleAuthError(error))
    );
  }

  login(email: string, password: string): Observable<boolean>
  {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError(error => this.handleAuthError(error))
      );
  }

  logout()
  {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }

  register(
    fullName: string,
    email: string,
    password: string
  ): Observable<boolean>
  {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        email,
        fullName,
        password,
      })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError(error => this.handleAuthError(error))
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleAuthError(error: unknown): Observable<boolean>
  {
    this.logout();
    return of(false);
  }

  private handleAuthSuccess({ token, user }: AuthResponse): boolean
  {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token);

    return true;
  }
}
