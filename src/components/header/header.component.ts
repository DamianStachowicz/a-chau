import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonComponent, HamburgerMenuComponent, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public panelVisible: WritableSignal<boolean> = signal<boolean>(false);
  private scrollThreshold: number = 100; // 100px threshold for showing/hiding panel
  private boundScrollHandler = this.handleScroll.bind(this); // Bind the method once to maintain the same reference
  private platformId: Object = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initial check for page load with scroll already > threshold
      this.checkScrollPosition();

      // Add scroll event listener with the bound handler
      window.addEventListener('scroll', this.boundScrollHandler);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.boundScrollHandler);
    }
  }

  private handleScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    const shouldShowPanel = currentScrollPosition > this.scrollThreshold;

    if (shouldShowPanel !== this.panelVisible()) {
      this.panelVisible.set(shouldShowPanel);
    }
  }
}
