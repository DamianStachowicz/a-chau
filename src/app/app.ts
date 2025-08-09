import { Component, inject } from '@angular/core';
import { MenuSectionComponent } from '../components/menu/section/section.component';
import { MenuService } from '../services/menu.service';
import { AsyncPipe } from '@angular/common';
import { MenuSection } from '../components/menu/section/section.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [MenuSectionComponent, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private menuService: MenuService = inject(MenuService);
  public menu$: Observable<{ sections: MenuSection[] }> = this.menuService.getMenu();
}
