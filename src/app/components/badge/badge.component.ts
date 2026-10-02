import { Component, input } from '@angular/core';

export type BadgeType = 'spicy' | 'vege';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
})
export class BadgeComponent {
  public readonly type = input<BadgeType>('vege');
  public readonly iconOnly = input<boolean>(true);
}
