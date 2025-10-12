import {
  Component,
  input,
  InputSignal,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MapLocation } from './map-location.interface';
import { MapComponent, MarkerComponent, PopupComponent } from '@maplibre/ngx-maplibre-gl';
import { StyleSpecification } from 'maplibre-gl';

/**
 * A workaround is used to replace MapLibre's default English cooperative gestures
 * messages with Polish translations. This is done by directly manipulating the DOM
 * after the map has loaded, as a built-in way to localize these messages seems to
 * not be working correctly in ngx-maplibre-gl.
 */
@Component({
  selector: 'app-map',
  imports: [MapComponent, MarkerComponent, PopupComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContainerComponent {
  public location: InputSignal<MapLocation> = input.required<MapLocation>();
  private platformId: object = inject(PLATFORM_ID);

  private readonly polishLocale = {
    cooperativeGesturesMac: 'Użyj ⌘ + przewijanie, aby powiększyć mapę',
    cooperativeGesturesWindows: 'Użyj Ctrl + przewijanie, aby powiększyć mapę',
    cooperativeGesturesMobile: 'Użyj dwóch palców, aby przesunąć mapę',
  };

  // OSM-style map configuration
  public mapStyle: StyleSpecification = {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© Współtwórcy OpenStreetMap',
      },
    },
    layers: [
      {
        id: 'osm-layer',
        type: 'raster',
        source: 'osm',
        minzoom: 0,
        maxzoom: 20,
      },
    ],
    glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  };

  public onMapLoad(): void {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.replaceMapMessages(), 0);
    }
  }

  private replaceMapMessages(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check if we're on macOS using modern detection methods
    const isMac = this.detectMacOS();

    // Find and replace desktop message
    const desktopMessage = document.querySelector('.maplibregl-desktop-message');
    if (desktopMessage) {
      const polishDesktopMessage = isMac
        ? this.polishLocale.cooperativeGesturesMac
        : this.polishLocale.cooperativeGesturesWindows;
      desktopMessage.textContent = polishDesktopMessage;
    }

    // Find and replace mobile message
    const mobileMessage = document.querySelector('.maplibregl-mobile-message');
    if (mobileMessage) {
      mobileMessage.textContent = this.polishLocale.cooperativeGesturesMobile;
    }
  }

  private detectMacOS(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('mac os x') || userAgent.includes('macintosh');
  }
}
