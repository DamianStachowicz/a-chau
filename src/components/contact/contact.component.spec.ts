import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ContactService } from '../../services/contact.service';
import { MapContainerComponent } from '../map/map.component';
import { provideZonelessChangeDetection, Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Contact } from './contact.interface';
import { MapLocation } from '../map/map-location.interface';

@Component({
  selector: 'app-map',
  template: '<div class="map-mock">Map Component Mock</div>',
})
class MockMapComponent {
  @Input() location!: MapLocation;
}

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let contactService: jasmine.SpyObj<ContactService>;

  const mockContactData: Contact = {
    address: {
      street: 'Test Street 123',
      postalCode: '00-000',
      city: 'Test City',
    },
    phone: {
      display: '+48 123 456 789',
      link: '+48123456789',
    },
    openingHours: {
      weekdays: {
        days: 'Mon-Fri',
        hours: '10:00 - 18:00',
      },
      weekend: {
        days: 'Sat-Sun',
        hours: '10:00 - 16:00',
      },
    },
    socials: {
      facebook: {
        url: 'https://facebook.com/test',
        icon: 'images/facebook.svg',
        alt: 'Facebook',
      },
      maps: {
        url: 'https://maps.google.com/test',
        icon: 'images/map-marker.svg',
        alt: 'Google Maps',
      },
    },
    map: {
      latitude: 52.0,
      longitude: 21.0,
      name: 'Test Restaurant',
    },
  };

  beforeEach(async () => {
    const contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContact']);
    contactServiceSpy.getContact.and.returnValue(of(mockContactData));

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ContactService, useValue: contactServiceSpy },
      ],
    })
      .overrideComponent(ContactComponent, {
        remove: { imports: [MapContainerComponent] },
        add: { imports: [MockMapComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    contactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should display the address correctly', () => {
    const addressElement = fixture.debugElement.query(By.css('.contact__item-content'));

    expect(addressElement).toBeTruthy();
    expect(addressElement.nativeElement.textContent.trim()).toContain('Test Street 123');
    expect(addressElement.nativeElement.textContent.trim()).toContain('00-000');
    expect(addressElement.nativeElement.textContent.trim()).toContain('Test City');
  });

  it('should display the phone number with correct link', () => {
    const phoneLink = fixture.debugElement.query(By.css('a[href*="tel:"]'));

    expect(phoneLink).toBeTruthy();
    expect(phoneLink.nativeElement.href).toBe('tel:+48123456789');
    expect(phoneLink.nativeElement.textContent.trim()).toBe('+48 123 456 789');
  });
});
