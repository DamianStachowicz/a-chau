import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { MenuSectionComponent } from './section/section.component';
import { Menu } from './menu.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe, MenuSectionComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  private menuService: MenuService = inject(MenuService);
  protected menu$: Observable<Menu> = this.menuService.getMenu();
}
