import { CommonModule } from '@angular/common';
import { Component, Output, Input, EventEmitter, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  createInvalidInputLength,
  InvalidInputEntries,
} from './InvalidInputEntries';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { LoadingAnimationComponent } from '../loading-animation/loading-animation.component';
import * as global from '../shared/globals';

@Component({
  selector: 'input-output',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    LoadingAnimationComponent,
  ],
  templateUrl: './input-output.component.html',
  styleUrl: './input-output.component.css',
})
export class InputOutputComponent {
  @Output() inputValue = new EventEmitter<any>();
  @Input() outputValue: string[] = [];
  @Input() title: string = '';
  @Input() showLoadingAnimation: boolean = false;

  private auth = inject(AuthService);
  private InvalidInputLength = createInvalidInputLength(this.auth);

  constructor(private clipboard: Clipboard) {}

  get getEmailVerified(): boolean {
    if (
      this.auth.currentUser() == null ||
      this.auth.currentUser() == undefined ||
      this.auth.currentUser()?.isAnonymous
    )
      return true;
    return this.auth.currentUser()?.emailVerified!;
  }

  _verificationMessage: string = 'click here to verify your email';
  get verificationMessage(): string {
    return this._verificationMessage;
  }

  get invalidLengthErrrorMessage(): string | undefined {
    return this.auth.currentUser() == undefined ||
      this.auth.currentUser() == null ||
      this.auth.currentUser()?.isAnonymous
      ? 'Create an account for more quota'
      : undefined;
  }

  inputControl = new FormControl('', [
    Validators.required,
    InvalidInputEntries,
    this.InvalidInputLength,
  ]);

  get currentCount(): string {
    return `${this.inputControl.value?.length}`;
  }

  get maxCount(): string {
    return this.auth.currentUser() == undefined ||
      this.auth.currentUser() == null ||
      this.auth.currentUser()?.isAnonymous
      ? `${global.free}`
      : '∞';
  }

  get currentCountStyle(): string {
    return this.inputControl.hasError('InvalidinputLength')
      ? 'text-red-500 font-bold'
      : '';
  }

  submitForm() {
    if (this.inputControl.dirty) {
      this.inputValue.emit(this.inputControl.value);
    }
  }

  copy() {
    let val: string = '';

    for (let i = 0; i < this.outputValue.length; i++) {
      val += this.outputValue[i];
    }

    const pending = this.clipboard.beginCopy(val);
    let remainingAttempts = 5;

    const attemptToCopy = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attemptToCopy);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };

    attemptToCopy();
  }

  sendVerificationEmail() {
    this.auth.sendVerificationEmail()?.subscribe(() => {
      this._verificationMessage = 'sent to your email';
    });
  }
}
