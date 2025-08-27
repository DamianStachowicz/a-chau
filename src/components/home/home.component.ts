import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
