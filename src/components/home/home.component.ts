import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { MapComponent } from '../map/map.component';
import { MapLocation } from '../map/map-location.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, MapComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public location: MapLocation = {
    latitude: 52.22870140039739,
    longitude: 20.90223476567207,
    name: 'Restauracja A Chau',
  };
}
