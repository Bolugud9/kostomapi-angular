import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvalidInputEntries } from './InvalidInputEntries';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'input-output',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './input-output.component.html',
  styleUrl: './input-output.component.css',
})
export class InputOutputComponent implements OnInit {
  @Output() inputValue = new EventEmitter<any>();
  @Input() outputValue: string[] = [];
  @Input() title: string = '';

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {}

  inputControl = new FormControl('', [
    Validators.required,
    InvalidInputEntries,
  ]);

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
}
