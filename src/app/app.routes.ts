import { Routes } from '@angular/router';
import { Mql4Mql5Component } from './mql4-mql5/mql4-mql5.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: Mql4Mql5Component,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
