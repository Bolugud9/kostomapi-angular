import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import * as global from '../shared/globals';
export function createInvalidInputLength(auth: AuthService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toLowerCase();

    if (auth.currentUser() == undefined) {
      return null;
    }
    // if(auth.currentUser()?.isAnonymous)

    return auth.currentUser() == undefined ||
      auth.currentUser() == null ||
      (auth.currentUser()?.isAnonymous && value.length > global.free)
      ? { InvalidinputLength: true }
      : null;
  };
}

export function InvalidInputEntries(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value?.toLowerCase();

  if (!value) {
    return null;
  }

  return value.trimStart() == '' ? { InvalidInputEntries: true } : null;
}
