import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  // a debug version for now, replace with actual data fetching logic
  public getMenu(): Observable<any> {
    return of({
      sections: [
        {
          id: 'przystawki',
          name: 'Przystawki',
          items: [
            {
              id: 'czipsy-krewetkowe',
              name: 'Czipsy krewetkowe',
              description: '(12 szt.)',
              price: 8,
            },
            {
              id: 'nem-saigon',
              name: 'Nem Saigon',
              variants: [
                {
                  id: 'wegetarianskie',
                  name: 'wegetariańskie',
                  description: '(5 szt.)',
                  price: 12,
                  vegetarian: true,
                },
                {
                  id: 'wieprzowe',
                  name: 'wieprzowe',
                  description: '(2 szt.)',
                  price: 13,
                },
                {
                  id: 'krewetkowo-krabowe',
                  name: 'krewetkowo-krabowe',
                  description: '(4 szt.)',
                  price: 15,
                  spicyness: 2,
                },
              ],
            },
            {
              id: 'tofu-chrupiace',
              name: 'Tofu chrupiące',
              price: 30,
              vegetarinan: true,
            },
            {
              id: 'kalmary-chrupiace',
              name: 'Kalmary chrupiące',
              price: 40,
              spicyness: 3,
            },
          ],
        },
      ],
    }).pipe(delay(300)); // Delay the response by 300ms
  }
}
