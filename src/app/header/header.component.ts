import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private auth: AuthService) {}

  get user() {
    return this.auth.currentUser();
  }

  goToHome() {
    this.router.navigate(['']);
  }

  signOut() {
    this.auth.logout();
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle();
  }
}
