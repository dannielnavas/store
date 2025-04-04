import { afterNextRender, Component, resource, signal } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export default class LocationsComponent {
  $origin = signal<string>('');

  constructor() {
    afterNextRender(() => {
      this.getCurrentLocation();
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        this.$origin.set(origin);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  locationRs = resource({
    request: () => ({ origin: this.$origin() }),
    loader: async ({ request }) => {
      const url = new URL(`${environment.apiUrl}/api/v1/locations`);
      if (request.origin) {
        url.searchParams.set('origin', request.origin);
      }
      const response = await fetch(url.toString());
      return response.json();
    },
  });
}
