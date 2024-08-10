import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-animation.component.html',
  styleUrl: './loading-animation.component.css',
})
export class LoadingAnimationComponent {
  @Input() showAnimation: boolean = false;
}
