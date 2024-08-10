import { Routes } from '@angular/router';
import { Mql4Mql5Component } from './mql4-mql5/mql4-mql5.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'mql4-mql5',
    component: Mql4Mql5Component,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
