import { AfterViewInit, Component, PLATFORM_ID, inject, input, InputSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MapLocation } from './map-location.interface';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  private map?: L.Map;
  private L?: typeof import('leaflet');
  private platformId = inject(PLATFORM_ID);
  public location: InputSignal<MapLocation> = input.required<MapLocation>();

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet().then(() => {
        setTimeout(() => this.initMap());
      });
    }
  }

  private async loadLeaflet(): Promise<void> {
    const leafletModule = await import('leaflet');
    this.L = leafletModule;
  }

  private initMap(): void {
    // Additional browser check for safety
    if (typeof document === 'undefined' || !this.L) {
      return;
    }

    const defaultIcon = this.L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // Set the default marker icon
    this.L.Marker.prototype.options.icon = defaultIcon;

    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found! Make sure <div id="map"></div> exists in the DOM.');
      return;
    }

    // Create map centered at the provided location
    const currentLocation = this.location();
    this.map = this.L.map('map').setView([currentLocation.latitude, currentLocation.longitude], 15);

    // Add OpenStreetMap tiles
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Add marker for the location
    if (this.map && this.L) {
      const currentLocation = this.location();
      this.L.marker([currentLocation.latitude, currentLocation.longitude])
        .addTo(this.map)
        .bindPopup(
          `
          <b>${currentLocation.name}</b><br />
          <a href="https://www.google.com/maps/dir//A+chau,+Karabeli+2D,+01-313+Warszawa/@52.2287107,20.8973621,754m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x471ecb275fc7c399:0x76816cc62925611b!2m2!1d20.9022287!2d52.2286861!3e0?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank">Wskazówki dojazdu</a>
        `
        )
        .openPopup();
    }
  }
}
