import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutUsComponent } from './about-us';
import { AboutUsService } from '../../services/about-us.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AboutUs } from './about-us.interface';

describe('AboutUsComponent', () => {
  let fixture: ComponentFixture<AboutUsComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let aboutUsService: jasmine.SpyObj<AboutUsService>;

  const mockAboutUsData: AboutUs = {
    heading: 'Test Heading',
    content: ['First paragraph content', 'Second paragraph content', 'Third paragraph content'],
  };

  beforeEach(async () => {
    const aboutUsServiceSpy = jasmine.createSpyObj('AboutUsService', ['getAboutUs']);
    aboutUsServiceSpy.getAboutUs.and.returnValue(of(mockAboutUsData));

    await TestBed.configureTestingModule({
      imports: [AboutUsComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AboutUsService, useValue: aboutUsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    aboutUsService = TestBed.inject(AboutUsService) as jasmine.SpyObj<AboutUsService>;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should display the heading correctly', () => {
    const headingElement = fixture.debugElement.query(By.css('.about-us__heading'));

    expect(headingElement).toBeTruthy();
    expect(headingElement.nativeElement.textContent.trim()).toBe('Test Heading');
  });

  it('should display all paragraphs correctly', () => {
    const paragraphElements = fixture.debugElement.queryAll(By.css('.about-us__paragraph'));

    expect(paragraphElements.length).toBe(3);
    expect(paragraphElements[0].nativeElement.textContent.trim()).toBe('First paragraph content');
    expect(paragraphElements[1].nativeElement.textContent.trim()).toBe('Second paragraph content');
    expect(paragraphElements[2].nativeElement.textContent.trim()).toBe('Third paragraph content');
  });
});
