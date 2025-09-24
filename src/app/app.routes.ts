import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MenuComponent } from '../components/menu/menu.component';
import { AboutUsComponent } from '../components/about-us/about-us';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutUsComponent },
  { path: '**', redirectTo: '' },
];
