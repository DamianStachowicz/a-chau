import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapContainerComponent } from './map.component';
import { MapLocation } from './map-location.interface';
import {
  provideZonelessChangeDetection,
  PLATFORM_ID,
  Component,
  Input,
  Output,
  EventEmitter,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { MapComponent, MarkerComponent, PopupComponent } from '@maplibre/ngx-maplibre-gl';
import { LngLatLike, StyleSpecification } from 'maplibre-gl';
import { By } from '@angular/platform-browser';

// Create simple mock components that don't depend on MapLibre services
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mgl-map',
  template: '<ng-content></ng-content>',
  standalone: true,
})
class MockMapComponent {
  @Input() style?: string | StyleSpecification;
  @Input() center?: LngLatLike;
  @Input() zoom?: number[];
  @Input() cooperativeGestures?: boolean;
  @Output() mapLoad = new EventEmitter<unknown>();

  getStyle() {
    return this.style;
  }
  getCenter() {
    return this.center;
  }
  getZoom() {
    return this.zoom;
  }
  getCooperativeGestures() {
    return this.cooperativeGestures;
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mgl-marker',
  template: '<ng-content></ng-content>',
  standalone: true,
})
class MockMarkerComponent {
  @Input() lngLat?: LngLatLike;

  getLngLat() {
    return this.lngLat;
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mgl-popup',
  template: '<ng-content></ng-content>',
  standalone: true,
})
class MockPopupComponent {
  @Input() marker?: MockMarkerComponent;
  @Input() focusAfterOpen?: boolean;
  @Input() closeButton?: boolean;

  getMarker() {
    return this.marker;
  }
  getFocusAfterOpen() {
    return this.focusAfterOpen;
  }
  getCloseButton() {
    return this.closeButton;
  }
}

describe('MapContainerComponent', () => {
  let component: MapContainerComponent;
  let fixture: ComponentFixture<MapContainerComponent>;

  const mockLocation: MapLocation = {
    latitude: 52.2287107,
    longitude: 20.8973621,
    name: 'A Chau Restaurant',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapContainerComponent],
      providers: [provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: 'browser' }],
    })
      .overrideComponent(MapContainerComponent, {
        remove: {
          imports: [MapComponent, MarkerComponent, PopupComponent],
        },
        add: {
          imports: [MockMapComponent, MockMarkerComponent, MockPopupComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MapContainerComponent);
    component = fixture.componentInstance;

    // Set required input - use the mockLocation directly, not wrapped in signal()
    fixture.componentRef.setInput('location', mockLocation);
  });

  it('renders the map with correct center coordinates', () => {
    fixture.detectChanges();

    // Get the mock map component instance
    const mapElement = fixture.debugElement.query(By.directive(MockMapComponent));
    expect(mapElement).toBeTruthy();

    const mockMapComponent = mapElement.componentInstance as MockMapComponent;

    // Check that the center is set correctly on the mock map component
    const center = mockMapComponent.center as [number, number];
    expect(center).toBeDefined();
    expect(center[0]).toBe(mockLocation.longitude);
    expect(center[1]).toBe(mockLocation.latitude);
  });

  it('renders the marker at the correct location', () => {
    fixture.detectChanges();

    const markerElement = fixture.debugElement.query(By.directive(MockMarkerComponent));
    expect(markerElement).toBeTruthy();

    const mockMarkerComponent = markerElement.componentInstance as MockMarkerComponent;

    // Check that the marker is positioned correctly
    const lngLat = mockMarkerComponent.lngLat as [number, number];
    expect(lngLat).toEqual([mockLocation.longitude, mockLocation.latitude]);
  });

  it('renders the popup with correct title and link', () => {
    fixture.detectChanges();

    const popupElement = fixture.debugElement.query(By.directive(MockPopupComponent));
    expect(popupElement).toBeTruthy();
    expect(popupElement.nativeElement.textContent).toContain(mockLocation.name);

    const linkElement = popupElement.nativeElement.querySelector('a');
    expect(linkElement).toBeTruthy();
    expect(linkElement.href).toContain(`www.google.com/maps`);
    expect(linkElement.href).toContain(`${mockLocation.latitude},${mockLocation.longitude}`);
  });

  it('configures the map with OSM style', () => {
    fixture.detectChanges();

    const mapElement = fixture.debugElement.query(By.directive(MockMapComponent));
    const mockMapComponent = mapElement.componentInstance as MockMapComponent;

    const style = mockMapComponent.getStyle() as StyleSpecification;
    expect(style).toBe(component.mapStyle);
    expect(style.sources['osm']).toBeDefined();
  });

  it('enables cooperative gestures', () => {
    fixture.detectChanges();

    const mapElement = fixture.debugElement.query(By.directive(MockMapComponent));
    const mockMapComponent = mapElement.componentInstance as MockMapComponent;

    expect(mockMapComponent.getCooperativeGestures()).toBe(true);
  });

  it('replaces default cooperative gestures messages with Polish translations', async () => {
    // Mock document.querySelector to simulate finding the message divs
    const mockDesktopDiv = { textContent: 'Use Ctrl + scroll to zoom the map' };
    const mockMobileDiv = { textContent: 'Use two fingers to move the map' };

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '.maplibregl-desktop-message') return mockDesktopDiv as Element;
      if (selector === '.maplibregl-mobile-message') return mockMobileDiv as Element;
      return null;
    });

    // Mock navigator.userAgent for non-Mac detection
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Windows NT 10.0; Win64; x64',
      configurable: true,
    });

    const mapElement = fixture.debugElement.query(By.directive(MockMapComponent));
    const mockMapComponent = mapElement.componentInstance as MockMapComponent;

    // Trigger the mapLoad event
    mockMapComponent.mapLoad.emit();
    fixture.detectChanges();

    // Wait for the setTimeout(0) in onMapLoad to complete
    await new Promise(resolve => setTimeout(resolve, 10));

    // Check that Polish messages were set
    expect(mockDesktopDiv.textContent).toBe(component['polishLocale'].cooperativeGesturesWindows);
    expect(mockMobileDiv.textContent).toBe(component['polishLocale'].cooperativeGesturesMobile);
  });

  it('detects macOS and shows Command key message', async () => {
    // Mock document.querySelector to simulate finding the message divs
    const mockDesktopDiv = { textContent: 'Use Ctrl + scroll to zoom the map' };
    const mockMobileDiv = { textContent: 'Use two fingers to move the map' };

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '.maplibregl-desktop-message') return mockDesktopDiv as Element;
      if (selector === '.maplibregl-mobile-message') return mockMobileDiv as Element;
      return null;
    });

    // Mock navigator.userAgent for macOS detection
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Macintosh; Intel Mac OS X 10_15_7',
      configurable: true,
    });

    const mapElement = fixture.debugElement.query(By.directive(MockMapComponent));
    const mockMapComponent = mapElement.componentInstance as MockMapComponent;

    // Trigger the mapLoad event
    mockMapComponent.mapLoad.emit();
    fixture.detectChanges();

    // Wait for the setTimeout(0) in onMapLoad to complete
    await new Promise(resolve => setTimeout(resolve, 10));

    // Check that Polish messages were set
    expect(mockDesktopDiv.textContent).toBe(component['polishLocale'].cooperativeGesturesMac);
    expect(mockMobileDiv.textContent).toBe(component['polishLocale'].cooperativeGesturesMobile);
  });

  it('does not manipulate DOM on server side', () => {
    // Create a new component with server platform
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [MapContainerComponent],
      providers: [provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: 'server' }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    const serverFixture = TestBed.createComponent(MapContainerComponent);
    const serverComponent = serverFixture.componentInstance;
    serverFixture.componentRef.setInput('location', mockLocation);

    const querySelectorSpy = spyOn(document, 'querySelector');

    serverComponent.onMapLoad();

    // querySelector should not be called on server
    expect(querySelectorSpy).not.toHaveBeenCalled();
  });
});
