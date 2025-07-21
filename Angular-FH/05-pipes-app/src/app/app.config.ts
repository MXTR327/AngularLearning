import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es-PE';
import localeFr from '@angular/common/locales/fr';
import { LocaleService } from './services/locale.service';

registerLocaleData( localeEs, "es" );
registerLocaleData( localeFr, "fr" );

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter( routes ),

    {
      // useValue: 'es',
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: ( localeService: LocaleService ) => localeService.getLocale(),
    }
  ]
};
