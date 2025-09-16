import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HamburgerMenuComponent } from './hamburger-menu.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HamburgerMenuComponent', () => {
  let component: HamburgerMenuComponent;
  let fixture: ComponentFixture<HamburgerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerMenuComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Menu toggle functionality', () => {
    it('should open menu when toggle is clicked', () => {
      expect(component.isMenuOpen()).toBe(false);
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(true);
    });

    it('should close menu when toggle is clicked again', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(true);
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should toggle menu state when hamburger lines are clicked', () => {
      const hamburgerLines = fixture.debugElement.query(By.css('.hamburger-menu__lines'));

      expect(component.isMenuOpen()).toBe(false);

      // Click hamburger lines
      hamburgerLines.nativeElement.click();
      expect(component.isMenuOpen()).toBe(true);

      // Click again
      hamburgerLines.nativeElement.click();
      expect(component.isMenuOpen()).toBe(false);
    });
  });

  describe('Menu close on clicking a link', () => {
    beforeEach(() => {
      // Open the menu before each test
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(true);
    });

    it('should close menu when any navigation link is clicked', () => {
      // Get all navigation links from the DOM
      const navigationLinks = fixture.debugElement.queryAll(
        By.css('.hamburger-menu__link[routerLink]')
      );

      expect(navigationLinks.length).toBeGreaterThan(0);

      navigationLinks.forEach((linkElement, index) => {
        // Re-open menu for each link test (except the first one)
        if (index > 0) {
          component.toggleMenu();
          expect(component.isMenuOpen()).toBe(true);
        }

        // Click the link
        linkElement.nativeElement.click();
        expect(component.isMenuOpen()).toBe(false);
      });
    });
  });
});
