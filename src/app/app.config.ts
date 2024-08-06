import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'kostomapi',
        appId: '1:993246645521:web:6b6dc2cda7bfc3fb55d0b0',
        storageBucket: 'kostomapi.appspot.com',
        apiKey: 'AIzaSyBn0Rv5V-PqF6zAvV3jb6hLhhUiyNvoDn8',
        authDomain: 'kostomapi.firebaseapp.com',
        messagingSenderId: '993246645521',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(withFetch()),
  ],
};
