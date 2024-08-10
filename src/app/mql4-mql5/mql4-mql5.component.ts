import { Component, OnInit } from '@angular/core';
import { InputOutputComponent } from '../input-output/input-output.component';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'mql4-mql5',
  standalone: true,
  imports: [InputOutputComponent, HeaderComponent],
  templateUrl: './mql4-mql5.component.html',
  styleUrl: './mql4-mql5.component.css',
})
export class Mql4Mql5Component implements OnInit {
  _outputValue: string[] = [];
  showLoadingAnimation: boolean = false;
  showSignInPopup: boolean = false;

  get outputValue(): string[] {
    return this._outputValue;
  }

  description: string =
    'Upgrade your trading strategy with ease by converting your MQL4 scripts to MQL5 with our advanced MQL4 to MQL5 script converter. Our user-friendly tool will ensure a seamless transition, preserving your original logic and functionality while taking advantage of the improved capabilities of MQL5.';
  title: string = 'MQL4 TO MQL5 CONVERTER';

  constructor(
    private _title: Title,
    private meta: Meta,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._title.setTitle(this.title);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/mql4-mql5' },
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

  ParseMQL4(value: string) {
    this.showLoadingAnimation = true;
    this.auth.ParseMQL4(value).subscribe(
      (val: string[]) => {
        this.showLoadingAnimation = false;
        this._outputValue = this.Format(val);
      },
      (error) => {
        this.showLoadingAnimation = false;
        if (error.error == 'login required') {
          this.showSignInPopup = true;
          // return;
        }
        this.toastr.error(error.error, 'Error', {
          toastClass: 'text-white rounded-lg hover:shadow-none px-5 py-2 my-1',
        });
      }
    );
  }

  private Format(outputValue: string[]): string[] {
    let tabCount = 0;

    for (let i = 0; i < outputValue.length; i++) {
      if (outputValue[i].includes('}') && !outputValue[i].includes('{')) {
        tabCount -= tabCount > 0 ? 1 : 0;
      }
      outputValue[i] = this.tab(tabCount) + outputValue[i] + '\n';
      if (outputValue[i].includes('{') && !outputValue[i].includes('}'))
        tabCount++;
    }

    return outputValue;
  }

  private tab(count: number): string {
    let val: string = '';
    if (count == 0) return '';
    else {
      for (let i = 0; i < count; i++) {
        val += '\t';
      }
      return val;
    }
  }
}
