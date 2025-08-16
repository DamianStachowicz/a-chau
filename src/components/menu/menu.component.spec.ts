import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { MenuService } from '../../services/menu.service';
import { BehaviorSubject, of } from 'rxjs';
import { Menu } from './menu.interface';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockMenuService: jasmine.SpyObj<MenuService>;
  let menuSubject: BehaviorSubject<Menu>;

  beforeEach(async () => {
    // Create a BehaviorSubject to control the menu data during tests
    menuSubject = new BehaviorSubject<Menu>({ annotation: '', sections: [] } as Menu);
    
    mockMenuService = jasmine.createSpyObj('MenuService', ['getMenu']);
    // Return the BehaviorSubject as an observable
    mockMenuService.getMenu.and.returnValue(menuSubject.asObservable());

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MenuService, useValue: mockMenuService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display menu sections', () => {
    const testMenu: Menu = {
      annotation: '',
      sections: [
        {
          id: 'test-section',
          name: 'Test Section',
          subsections: []
        }
      ]
    };
    menuSubject.next(testMenu);
    fixture.detectChanges();

    const sectionHeading = fixture.nativeElement.querySelector('.menu-section__heading');
    expect(sectionHeading).toBeTruthy();
    expect(sectionHeading.textContent.trim()).toBe(testMenu.sections[0].name);
  });

  it('should handle empty menu', () => {
    menuSubject.next({ annotation: '', sections: [] } as Menu);
    fixture.detectChanges();

    const sectionHeading = fixture.nativeElement.querySelector('.menu-section__heading');
    expect(sectionHeading).toBeNull();
  });
});
