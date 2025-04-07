import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // una vex termine la carga inicial empieza a descargar todo el resto de los módulos withPreloading(PreloadAllModules)
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withFetch()), // withFetch() es el que se encarga de hacer las peticiones http del lado del servidor
    provideClientHydration(withEventReplay()), // aquí hace la rehydration del lado del cliente
  ],
};
