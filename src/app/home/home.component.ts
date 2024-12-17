import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  description: string =
    'Upgrade your trading strategy with ease by converting your MQL4 scripts to MQL5 with our advanced MQL4 to MQL5 script converter. Our user-friendly tool will ensure a seamless transition, preserving your original logic and functionality while taking advantage of the improved capabilities of MQL5.';
  title: string = 'Home - KostomApi';

  constructor(private _title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this._title.setTitle(this.title);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/' },
      { name: 'og:title', content: this.title },
      { name: 'og:description', content: this.description },
      { name: 'og:locale', content: 'en_US' },
      { name: 'og:site_name', content: 'KostomApi' },
      { name: 'og:image', content: '/img/KostomApiLogoBlack-BW.png' },
      {
        name: 'robots',
        content:
          'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
      },
    ]);
  }
}
