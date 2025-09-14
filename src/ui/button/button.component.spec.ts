import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  template: '',
})
class DummyComponent {}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: 'test-route', component: DummyComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should not be disabled by default', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.disabled).toBe(true);
  });

  it('should navigate to the correct route when clicked', async () => {
    fixture.componentRef.setInput('routerLink', '/test-route');
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();

    buttonElement.click();
    await fixture.whenStable();

    expect(location.path()).toBe('/test-route');
  });

  it('should not navigate when disabled', async () => {
    fixture.componentRef.setInput('routerLink', '/test-route');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();

    const initialPath = location.path();
    buttonElement.click();
    await fixture.whenStable();

    // Should stay on the same path since button is disabled
    expect(location.path()).toBe(initialPath);
  });

  it('should display the label provided as content', () => {
    // Create a wrapper component to test content projection
    @Component({
      template: '<ui-button>Click Me</ui-button>',
      imports: [ButtonComponent],
    })
    class TestWrapperComponent {}

    const wrapperFixture = TestBed.createComponent(TestWrapperComponent);
    wrapperFixture.detectChanges();

    const buttonElement: HTMLButtonElement = wrapperFixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent?.trim()).toBe('Click Me');
  });
});
