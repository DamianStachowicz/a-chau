import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from '../components/contact/contact.interface';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ContactService);
  });

  it('should return a Contact object from getContact', async () => {
    const contact: Contact = await firstValueFrom(service.getContact());
    expect(contact).toBeDefined();

    expect(contact.address).toBeDefined();
    expect(contact.address.street).toBeDefined();
    expect(contact.address.postalCode).toBeDefined();
    expect(contact.address.city).toBeDefined();

    expect(contact.phone).toBeDefined();
    expect(contact.phone.display).toBeDefined();
    expect(contact.phone.link).toBeDefined();

    expect(contact.openingHours).toBeDefined();
    expect(contact.openingHours.weekdays).toBeDefined();
    expect(contact.openingHours.weekdays.days).toBeDefined();
    expect(contact.openingHours.weekdays.hours).toBeDefined();
    expect(contact.openingHours.weekend).toBeDefined();
    expect(contact.openingHours.weekend.days).toBeDefined();
    expect(contact.openingHours.weekend.hours).toBeDefined();

    expect(contact.socials).toBeDefined();
    expect(contact.socials.facebook).toBeDefined();
    expect(contact.socials.facebook.url).toBeDefined();
    expect(contact.socials.facebook.icon).toBeDefined();
  });
});
