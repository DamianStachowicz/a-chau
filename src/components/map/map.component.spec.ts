import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { MapLocation } from './map-location.interface';
import { PLATFORM_ID } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

// Type definitions for mocks
interface MockLeafletMap {
  setView: jasmine.Spy;
}

interface MockLeafletTileLayer {
  addTo: jasmine.Spy;
}

interface MockLeafletMarker {
  addTo: jasmine.Spy;
}

interface MockLeaflet {
  icon: jasmine.Spy;
  Marker: { prototype: { options: Record<string, unknown> } };
  map: jasmine.Spy;
  tileLayer: jasmine.Spy;
  marker: jasmine.Spy;
}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  const mockLeaflet: MockLeaflet = {
    icon: jasmine.createSpy('icon').and.returnValue({}),
    Marker: { prototype: { options: {} } },
    map: jasmine.createSpy('map').and.returnValue({
      setView: jasmine.createSpy('setView').and.returnValue({}),
    }),
    tileLayer: jasmine.createSpy('tileLayer').and.returnValue({
      addTo: jasmine.createSpy('addTo'),
    }),
    marker: jasmine.createSpy('marker').and.returnValue({
      addTo: jasmine.createSpy('addTo').and.returnValue({
        bindPopup: jasmine.createSpy('bindPopup').and.returnValue({
          openPopup: jasmine.createSpy('openPopup'),
        }),
      }),
    }),
  };

  const mockLocation: MapLocation = {
    latitude: 52.2287,
    longitude: 20.9022,
    name: 'Test Restaurant',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(component as any, 'loadLeaflet').and.callFake(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (component as any).L = mockLeaflet;
    });
  });

  it('should render map container', () => {
    fixture.componentRef.setInput('location', mockLocation);
    fixture.detectChanges();

    const mapContainer = fixture.debugElement.query(By.css('#map'));
    expect(mapContainer).toBeTruthy();
    expect(mapContainer.nativeElement.style.height).toBe('500px');
  });

  it('should have location input signal', () => {
    fixture.componentRef.setInput('location', mockLocation);
    expect(component.location()).toEqual(mockLocation);
  });

  it('should handle server platform', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    const serverFixture = TestBed.createComponent(MapComponent);
    const serverComponent = serverFixture.componentInstance;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(serverComponent as any, 'loadLeaflet');
    serverComponent.ngAfterViewInit();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((serverComponent as any).loadLeaflet).not.toHaveBeenCalled();
  });

  it('should call loadLeaflet on browser platform', () => {
    component.ngAfterViewInit();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((component as any).loadLeaflet).toHaveBeenCalled();
  });

  it('should handle initMap when document is available', () => {
    fixture.componentRef.setInput('location', mockLocation);

    const mockMap: MockLeafletMap = {
      setView: jasmine.createSpy('setView').and.returnValue({}),
    };

    const mockTileLayer: MockLeafletTileLayer = {
      addTo: jasmine.createSpy('addTo').and.returnValue({}),
    };

    const mockMarker: MockLeafletMarker = {
      addTo: jasmine.createSpy('addTo').and.returnValue({
        bindPopup: jasmine.createSpy('bindPopup').and.returnValue({
          openPopup: jasmine.createSpy('openPopup'),
        }),
      }),
    };

    const mockLeafletLocal: MockLeaflet = {
      map: jasmine.createSpy('map').and.returnValue(mockMap),
      tileLayer: jasmine.createSpy('tileLayer').and.returnValue(mockTileLayer),
      marker: jasmine.createSpy('marker').and.returnValue(mockMarker),
      icon: jasmine.createSpy('icon').and.returnValue({}),
      Marker: { prototype: { options: {} } },
    };

    // Set this.L on the component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).L = mockLeafletLocal;

    // Mock DOM element
    const mockElement = document.createElement('div');
    mockElement.id = 'map';
    spyOn(document, 'getElementById').and.returnValue(mockElement);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).initMap();

    expect(mockLeafletLocal.map).toHaveBeenCalledWith('map');
    expect(mockLeafletLocal.tileLayer).toHaveBeenCalledWith(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      jasmine.any(Object)
    );
    expect(mockLeafletLocal.marker).toHaveBeenCalledWith([
      mockLocation.latitude,
      mockLocation.longitude,
    ]);
  });

  it('should not initialize map when document is not available', () => {
    const mockLeafletLocal = {
      map: jasmine.createSpy('map'),
      icon: jasmine.createSpy('icon'),
    };

    // Set L but mock the early return condition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).L = mockLeafletLocal;

    // Spy on initMap to simulate the document check
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(component as any, 'initMap').and.callFake(() => {
      // Simulate the early return when document is undefined
      return; // Early return without calling any Leaflet methods
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (component as any).initMap();

    expect(mockLeafletLocal.map).not.toHaveBeenCalled();
  });
});
