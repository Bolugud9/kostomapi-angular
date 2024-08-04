import { AbstractControl, ValidationErrors } from '@angular/forms';

export function InvalidInputEntries(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value?.toLowerCase();

  if (!value) {
    return null;
  }

  return value.trimStart() == '' ? { InvalidInputEntries: true } : null;
}
