import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Creator } from '../../shared/mql4-mql5/mt4';

@Injectable({
  providedIn: 'root',
})
export class Mql4Mql5Service {
  constructor() {}

  ParseMQL4(value: string): Observable<string[]> {
    let Array = [];
    let tempValue = '';

    for (let i = 0; i < value.length; i++) {
      if (value[i + 1] == '\n') {
        tempValue += value[i];
        Array.push(tempValue.trim());
        tempValue = '';
      } else {
        tempValue += value[i];
      }
    }

    Array.push(tempValue.trim());
    return of(Creator(Array));
  }
}
