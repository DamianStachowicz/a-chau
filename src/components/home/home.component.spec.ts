import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

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
});
