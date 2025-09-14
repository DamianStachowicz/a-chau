import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { Menu } from '../components/menu/menu.interface';
import { firstValueFrom } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(MenuService);
  });

  it('should return a Menu object from getMenu', async () => {
    const menu: Menu = await firstValueFrom(service.getMenu());
    expect(menu).toBeDefined();
    expect(menu.annotation).toBeDefined();
    expect(menu.sections).toBeDefined();
  });
});
