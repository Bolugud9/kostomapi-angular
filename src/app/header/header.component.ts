import {
  Component,
  EventEmitter,
  inject,
  Input,
  model,
  Output,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoadingAnimationComponent } from '../loading-animation/loading-animation.component';

enum AccountLoginType {
  LOGIN,
  SIGN_UP,
  FORGOT_PASSWORD,
  RECORVERY_VERIFICATION,
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    LoadingAnimationComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // @Input() set toggleSigninClicked(bool: boolean) {
  //   this.signInClicked = bool;
  // }

  signInClicked = model(false);

  // @Output() signInClicked.update((value)=>!value) = new EventEmitter<any>();

  showLoadingAnimation: boolean = false;
  // signInClicked: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  accountLoginType = signal<AccountLoginType>(AccountLoginType.LOGIN);

  get user() {
    return this.auth.currentUser();
  }

  get valid(): boolean {
    if (
      this.accountLoginType() === 0 &&
      this.inputControl.get('senderEmailControl')?.valid &&
      this.inputControl.get('senderPasswordControl')?.valid
    ) {
      return true;
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderNameControl')?.valid &&
      this.inputControl.get('senderEmailControl')?.valid &&
      this.inputControl.get('senderPasswordControl')?.valid
    ) {
      return true;
    } else if (
      this.accountLoginType() === 2 &&
      this.inputControl.get('senderEmailControl')?.valid
    ) {
      return true;
    }
    return false;
  }

  get dirty(): boolean {
    if (
      this.accountLoginType() === 0 &&
      this.inputControl.get('senderEmailControl')?.dirty &&
      this.inputControl.get('senderPasswordControl')?.dirty
    ) {
      return true;
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderNameControl')?.dirty &&
      this.inputControl.get('senderEmailControl')?.dirty &&
      this.inputControl.get('senderPasswordControl')?.dirty
    ) {
      return true;
    } else if (
      this.accountLoginType() === 2 &&
      this.inputControl.get('senderEmailControl')?.dirty
    ) {
      return true;
    }
    return false;
  }

  get errorMessage(): string | null {
    if (
      this.accountLoginType() === 0 &&
      this.inputControl.get('senderEmailControl')?.hasError('required') &&
      this.inputControl.get('senderEmailControl')?.touched
    ) {
      return 'email field is required';
    } else if (
      this.accountLoginType() === 0 &&
      this.inputControl.get('senderEmailControl')?.hasError('email') &&
      this.inputControl.get('senderEmailControl')?.dirty &&
      this.inputControl.get('senderEmailControl')?.touched
    ) {
      return 'Please enter your email address';
    } else if (
      this.accountLoginType() === 0 &&
      this.inputControl.get('senderPasswordControl')?.hasError('required') &&
      this.inputControl.get('senderPasswordControl')?.touched
    ) {
      return 'Password is required';
    } else if (
      this.accountLoginType() === 0 &&
      this.inputControl.get('senderPasswordControl')?.hasError('minLength') &&
      this.inputControl.get('senderPasswordControl')?.dirty &&
      this.inputControl.get('senderPasswordControl')?.touched
    ) {
      return 'Password must be at least 6 characters';
    } else if (
      this.accountLoginType() === 2 &&
      this.inputControl.get('senderEmailControl')?.hasError('email') &&
      this.inputControl.get('senderEmailControl')?.dirty &&
      this.inputControl.get('senderEmailControl')?.touched
    ) {
      return 'Please enter your email address';
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderNameControl')?.hasError('required') &&
      this.inputControl.get('senderNameControl')?.touched
    ) {
      return 'Name is required';
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderNameControl')?.hasError('minLength') &&
      this.inputControl.get('senderNameControl')?.dirty &&
      this.inputControl.get('senderNameControl')?.touched
    ) {
      return 'Name must be at least 5 characters';
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderEmailControl')?.hasError('required') &&
      this.inputControl.get('senderEmailControl')?.touched
    ) {
      return 'email field is required';
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderEmailControl')?.hasError('email') &&
      this.inputControl.get('senderEmailControl')?.dirty &&
      this.inputControl.get('senderEmailControl')?.touched
    ) {
      return 'Please enter your email address';
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderPasswordControl')?.hasError('required') &&
      this.inputControl.get('senderPasswordControl')?.touched
    ) {
      return 'Password is required';
    } else if (
      this.accountLoginType() === 1 &&
      this.inputControl.get('senderPasswordControl')?.hasError('minLength') &&
      this.inputControl.get('senderPasswordControl')?.dirty &&
      this.inputControl.get('senderPasswordControl')?.touched
    ) {
      return 'Password must be at least 5 characters';
    }
    return null;
  }

  inputControl = new FormGroup({
    senderNameControl: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    senderEmailControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    senderPasswordControl: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  goToHome() {
    this.router.navigate(['']);
  }

  signOut() {
    this.auth.logout();
  }

  signIn() {
    this.signInClicked.update((value) => !value);
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle().subscribe(() => {
      this.signInClicked.update((value) => !value);
    });
  }

  forgotPasswordClicked() {
    this.accountLoginType.update(() => AccountLoginType.FORGOT_PASSWORD);
  }

  dontHaveAccountClicked() {
    this.accountLoginType.update(() => AccountLoginType.SIGN_UP);
  }

  alreadyHaveAccountClicked() {
    this.accountLoginType.update(() => AccountLoginType.LOGIN);
  }

  sendVerificationEmail() {
    this.auth.sendVerificationEmail()?.subscribe(() => {
      // this._verificationMessage = 'sent to your email';
    });
  }

  submit() {
    if (!this.valid) return;
    this.showLoadingAnimation = true;
    switch (this.accountLoginType()) {
      case AccountLoginType.LOGIN:
        this.auth
          .login(
            this.inputControl.get('senderEmailControl')?.value!,
            this.inputControl.get('senderPasswordControl')?.value!
          )
          .subscribe(
            (x) => {
              this.displaySuccessMessage(x);
              this.quit();
            },
            (error) => {
              this.displayErrorMessage(error);
            }
          );
        break;

      case AccountLoginType.SIGN_UP:
        this.auth
          .register(
            this.inputControl.get('senderEmailControl')?.value!,
            this.inputControl.get('senderPasswordControl')?.value!,
            this.inputControl.get('senderNameControl')?.value!
          )
          .subscribe(
            (x) => {
              this.displaySuccessMessage(x);
              this.quit();
            },
            (error) => {
              this.displayErrorMessage(error);
            }
          );
        break;

      case AccountLoginType.FORGOT_PASSWORD:
        this.auth
          .forgotPassword(this.inputControl.get('senderEmailControl')?.value!)
          .subscribe(
            (x) => {
              this.displaySuccessMessage(x);
              this.quit();
            },
            (error) => {
              this.displayErrorMessage(error);
            }
          );
        break;
    }
    this.inputControl.reset();
  }

  quit() {
    this.signInClicked.update((value) => !value);
    // this.signInClicked = false;
    this.accountLoginType.update(() => AccountLoginType.LOGIN);
    this.toastr.clear();
  }

  displaySuccessMessage(error: any) {
    this.showLoadingAnimation = false;
    this.toastr.success(error.message, 'Success', {
      toastClass: 'text-white rounded-lg hover:shadow-none px-5 py-2 my-1',
    });
  }

  displayErrorMessage(error: any) {
    this.showLoadingAnimation = false;
    this.toastr.error(error.message, 'Error', {
      toastClass: 'text-white rounded-lg hover:shadow-none px-5 py-2 my-1',
    });
  }
}
