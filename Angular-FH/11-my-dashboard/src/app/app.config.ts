import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { reqresInterceptor } from '@dashboard/interceptors/reqres.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions({
        // skipInitialTransition: true,
        // onViewTransitionCreated(transitionInfo)
        // {
        //   console.log({ transitionInfo });
        // },
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([reqresInterceptor])),
  ],
};
