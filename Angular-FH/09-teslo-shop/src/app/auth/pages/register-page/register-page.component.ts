import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent
{
  authService = inject(AuthService);

  hasError = signal(false);

  private fb = inject(FormBuilder);
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  router = inject(Router);
  onSubmit()
  {
    if (this.registerForm.invalid)
    {
      this.hasError.set(true);
      setTimeout(() =>
      {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const {
      email = '',
      fullName = '',
      password = '',
    } = this.registerForm.value;

    this.authService
      .register(fullName!, email!, password!)
      .subscribe(isAuthenticated =>
      {
        if (isAuthenticated)
        {
          this.router.navigateByUrl('/');
          return;
        }

        this.hasError.set(true);
        setTimeout(() =>
        {
          this.hasError.set(false);
        }, 2000);
      });
  }
}
