import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MenuSection } from './section.interface';

@Component({
  selector: 'app-menu-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSectionComponent {
  public section: InputSignal<MenuSection> = input.required<MenuSection>();
}
