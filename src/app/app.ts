import { Component } from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
