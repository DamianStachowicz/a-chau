import { TestBed } from '@angular/core/testing';
import { AboutUsService } from './about-us.service';
import { AboutUs } from '../components/about-us/about-us.interface';
import { firstValueFrom } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AboutUsService', () => {
  let service: AboutUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(AboutUsService);
  });

  it('should return an AboutUs object from getAboutUs', async () => {
    const aboutUs: AboutUs = await firstValueFrom(service.getAboutUs());
    expect(aboutUs).toBeDefined();
    expect(aboutUs.heading).toBeDefined();
    expect(aboutUs.content).toBeDefined();
  });
});
