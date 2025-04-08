import { RenderMode, ServerRoute } from '@angular/ssr';

// Aqui se manejan las estrategias de renderizado para las rutas

export const serverRoutes: ServerRoute[] = [
  {
    path: 'locations',
    renderMode: RenderMode.Client,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
