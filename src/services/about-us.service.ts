import { Injectable } from '@angular/core';
import aboutUsData from '../../public/about-us.json';
import { delay, Observable, of } from 'rxjs';
import { AboutUs } from '../components/about-us/about-us.interface';

@Injectable({ providedIn: 'root' })
export class AboutUsService {
  // a debug version for now, replace with actual data fetching logic
  public getAboutUs(): Observable<AboutUs> {
    return of(aboutUsData).pipe(delay(300)); // Delay the response by 300ms
  }
}
