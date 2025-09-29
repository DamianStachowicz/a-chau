import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from './contact.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-contact',
  imports: [AsyncPipe, MapComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private contactService: ContactService = inject(ContactService);
  protected contact$: Observable<Contact> = this.contactService.getContact();
}
