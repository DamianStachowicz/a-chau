import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [FooterComponent],
})
export class App {}
