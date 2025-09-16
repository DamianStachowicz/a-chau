import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuComponent {
  public isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  public toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
