import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { MenuService } from '../../services/menu.service';
import { of } from 'rxjs';
import { Menu } from './menu.interface';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockMenuService: jasmine.SpyObj<MenuService>;

  beforeEach(async () => {
    mockMenuService = jasmine.createSpyObj('MenuService', ['getMenu']);
    mockMenuService.getMenu.and.returnValue(of({ annotation: '', sections: [] } as Menu));

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [{ provide: MenuService, useValue: mockMenuService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
