import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let originalScrollY: PropertyDescriptor | undefined;
  let originalDocumentElement: Document['documentElement'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Mock window.scrollY and document.documentElement.scrollTop
    originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
    originalDocumentElement = document.documentElement;

    fixture.detectChanges();
  });

  afterEach(() => {
    // Restore original properties
    if (originalScrollY) {
      Object.defineProperty(window, 'scrollY', originalScrollY);
    }
    Object.defineProperty(document, 'documentElement', {
      value: originalDocumentElement,
      writable: true,
      configurable: true,
    });
  });

  describe('Scroll Behavior', () => {
    beforeEach(() => {
      // Reset panel visibility before each test
      component.panelVisible.set(false);
    });

    it('should not display panel initially when page is at top', () => {
      // Mock scroll position at top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      Object.defineProperty(document, 'documentElement', {
        value: { scrollTop: 0 },
        writable: true,
        configurable: true,
      });

      component.ngOnInit();

      expect(component.panelVisible()).toBe(false);
    });

    it('should display panel when scrolled down past threshold', () => {
      // Mock scroll position beyond threshold (100px)
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
      Object.defineProperty(document, 'documentElement', {
        value: { scrollTop: 150 },
        writable: true,
        configurable: true,
      });

      component.ngOnInit();

      expect(component.panelVisible()).toBe(true);
    });

    it('should hide panel when scrolled back up above threshold', () => {
      // First show the panel
      component.panelVisible.set(true);

      // Mock scroll position back to top
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      Object.defineProperty(document, 'documentElement', {
        value: { scrollTop: 50 },
        writable: true,
        configurable: true,
      });

      // Trigger scroll check
      component['checkScrollPosition']();

      expect(component.panelVisible()).toBe(false);
    });
  });
});
