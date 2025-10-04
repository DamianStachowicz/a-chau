import { Injectable } from '@angular/core';
import contactData from '../../public/data/contact.json';
import { delay, Observable, of } from 'rxjs';
import { Contact } from '../components/contact/contact.interface';

@Injectable({ providedIn: 'root' })
export class ContactService {
  // a debug version for now, replace with actual data fetching logic
  public getContact(): Observable<Contact> {
    return of(contactData).pipe(delay(300)); // Delay the response by 300ms
  }
}
