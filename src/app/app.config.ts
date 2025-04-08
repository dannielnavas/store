import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
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
  withIncrementalHydration,
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
    provideClientHydration(withEventReplay(), withIncrementalHydration()), // aquí hace la rehydration del lado del cliente
    // withEventReplay para que no se pierdan los eventos que se han emitido por el usurio como los clicks
    // withIncrementalHydration esto hace la rehidratación incremental, es decir, va rehidratando los componentes a medida que se van viendo en la pantalla

    provideExperimentalZonelessChangeDetection(), // esto es para que no use el zone.js, es decir, no use el change detection de angular tradicional
  ],
};
