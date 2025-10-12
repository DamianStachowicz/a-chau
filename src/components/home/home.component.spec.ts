import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { MapLocation } from '../map/map-location.interface';
import { MapContainerComponent } from '../map/map.component';

// Mock MapComponent
@Component({
  selector: 'app-map',
  template: '<div class="mock-map" data-testid="mock-map">Mock Map Component</div>',
  standalone: true,
})
class MockMapComponent {
  @Input() location!: MapLocation;
}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(HomeComponent, {
        remove: { imports: [MapContainerComponent] },
        add: { imports: [MockMapComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('should display the main heading', () => {
    const h1Element = fixture.debugElement.query(By.css('h1'));
    expect(h1Element).toBeTruthy();
  });

  it('should display the subtitle', () => {
    const h2Element = fixture.debugElement.query(By.css('h2'));
    expect(h2Element).toBeTruthy();
  });

  it('should have ui-button with correct routerLink', () => {
    const buttonElement = fixture.debugElement.query(By.css('ui-button'));
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.getAttribute('routerLink')).toBe('/menu');
  });

  it('should have all required elements present', () => {
    const elements = {
      home: fixture.debugElement.query(By.css('.home')),
      titleSection: fixture.debugElement.query(By.css('.home__title')),
      mainHeading: fixture.debugElement.query(By.css('h1')),
      subtitle: fixture.debugElement.query(By.css('h2')),
      actionButton: fixture.debugElement.query(By.css('ui-button')),
    };

    Object.values(elements).forEach(element => {
      expect(element).toBeTruthy();
    });
  });

  it('should render mock map component', () => {
    const mockMapElement = fixture.debugElement.query(By.css('[data-testid="mock-map"]'));
    expect(mockMapElement).toBeTruthy();
    expect(mockMapElement.nativeElement.textContent.trim()).toBe('Mock Map Component');
  });

  it('should pass location to map component', () => {
    const mapComponent = fixture.debugElement.query(By.directive(MockMapComponent));
    expect(mapComponent).toBeTruthy();
    expect(mapComponent.componentInstance.location).toBeDefined();
  });
});
