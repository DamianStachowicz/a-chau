import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('should have footer__contact element', () => {
    const contactElement = fixture.debugElement.query(By.css('.footer__contact'));
    expect(contactElement).toBeTruthy();
  });

  it('should have footer__opening-hours element', () => {
    const openingHoursElement = fixture.debugElement.query(By.css('.footer__opening-hours'));
    expect(openingHoursElement).toBeTruthy();
  });

  it('should have footer__socials element', () => {
    const socialsElement = fixture.debugElement.query(By.css('.footer__socials'));
    expect(socialsElement).toBeTruthy();
  });
});
