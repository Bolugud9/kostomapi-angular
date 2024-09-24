import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'kostomapi',
        appId: '/*secret*/',
        storageBucket: '/*secret*/',
        apiKey: '/*secret*/',
        authDomain: '/*secret*/',
        messagingSenderId: '/*secret*/',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      titleClass: 'text-xl font-bold',
      messageClass: 'text-sm font-medium',
      timeOut: 2500,
      iconClasses: {
        error: 'bg-red-700',
        success: 'bg-green-700',
      },
    }),
  ],
};
