import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not be disabled by default', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should have correct routerLink when set', () => {
    fixture.componentRef.setInput('routerLink', '/test-route');
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.getAttribute('ng-reflect-router-link')).toBe('/test-route');
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.disabled).toBe(true);
  });

  it('should display content correctly', () => {
    fixture.nativeElement.innerHTML = '<ui-button>Test Content</ui-button>';
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should have proper component properties', () => {
    expect(component.disabled).toBeDefined();
    expect(component.routerLink).toBeDefined();
    expect(typeof component.disabled).toBe('function');
    expect(typeof component.routerLink).toBe('function');
  });
});
