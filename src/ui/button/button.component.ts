import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public disabled: InputSignal<boolean> = input<boolean>(false);
  public routerLink: InputSignal<string | any[]> = input<string | any[]>('');
}
