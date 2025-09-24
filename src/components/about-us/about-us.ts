import { Component, inject } from '@angular/core';
import { AboutUsService } from '../../services/about-us.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AboutUs } from './about-us.interface';

@Component({
  selector: 'app-about-us',
  imports: [AsyncPipe],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUsComponent {
  private aboutUsService: AboutUsService = inject(AboutUsService);
  protected aboutUs$: Observable<AboutUs> = this.aboutUsService.getAboutUs();
}
