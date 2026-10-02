import { Component, signal } from '@angular/core';
import { BadgeComponent } from '../../components/badge/badge.component';
import { Menu } from '../../interfaces/menu.interfrace';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [BadgeComponent],
})
export class MenuComponent {
  public menu = signal<Menu | null>(null);
  private readonly menuUrl = '/data/menu.json';

  constructor() {
    this.fetchMenu();
  }

  private fetchMenu(): void {
    fetch(this.menuUrl)
      .then(response => response.json())
      .then((data: Menu) => this.menu.set(data))
      .catch(error => console.error('Error fetching menu:', error));
  }
}
