import { Component, OnInit } from '@angular/core';
import { InputOutputComponent } from '../input-output/input-output.component';
import { Mql4Mql5Service } from './mql4-mql5.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'mql4-mql5',
  standalone: true,
  imports: [InputOutputComponent],
  templateUrl: './mql4-mql5.component.html',
  styleUrl: './mql4-mql5.component.css',
})
export class Mql4Mql5Component implements OnInit {
  _outputValue: string[] = [];
  get outputValue(): string[] {
    return this._outputValue;
  }

  description: string =
    'Upgrade your trading strategy with ease by converting your MQL4 scripts to MQL5 with our advanced MQL4 to MQL5 script converter. Our user-friendly tool will ensure a seamless transition, preserving your original logic and functionality while taking advantage of the improved capabilities of MQL5.';
  title: string = 'MQL4 TO MQL5 CONVERTER';

  constructor(
    private mql45: Mql4Mql5Service,
    private _title: Title,
    private meta: Meta
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
    ]);
  }

  ParseMQL4(value: string) {
    this.mql45.ParseMQL4(value).subscribe((val: string[]) => {
      this._outputValue = this.Format(val);
    });
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
