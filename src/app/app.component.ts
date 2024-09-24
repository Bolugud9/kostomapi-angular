import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputOutputComponent } from './input-output/input-output.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './shared/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputOutputComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private auth: AuthService) {
    afterNextRender({
      write: () => {
        this.auth.user$.subscribe((user: User) => {
          if (user && !user.isAnonymous) {
            this.auth.currentUser.set({
              username: user.displayName!,
              email: user.email!,
              freeUser: true,
              isAnonymous: false,
              emailVerified: user.emailVerified,
            });
            this.auth.uid = user.uid;
            this.auth.serverRegisterUser(1, user.uid);
          } else if (user && user.isAnonymous) {
            this.auth.currentUser.set({
              username: '',
              email: '',
              freeUser: true,
              isAnonymous: true,
              emailVerified: false,
            });
            this.auth.uid = user.uid;
            this.auth.serverRegisterUser(0, user.uid);
          } else {
            //try to create an anonymous user
            this.auth.signInAnonymous();
          }
        });
      },
    });
  }
}
