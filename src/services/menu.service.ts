import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Menu } from '../components/menu/menu.interface';

// Import the menu data from the JSON file
import menuData from '../../public/data/menu.json';

@Injectable({ providedIn: 'root' })
export class MenuService {
  // a debug version for now, replace with actual data fetching logic
  public getMenu(): Observable<Menu> {
    return of(menuData).pipe(delay(300)); // Delay the response by 300ms
  }
}
