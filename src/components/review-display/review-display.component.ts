import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { Review } from './review.interface';

@Component({
  selector: 'app-review-display',
  standalone: true,
  imports: [],
  templateUrl: './review-display.component.html',
  styleUrls: ['./review-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDisplayComponent implements OnInit {
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  public reviews: InputSignal<Review[]> = input.required<Review[]>();
  private autoAdvanceInterval: ReturnType<typeof setInterval> | null = null;
  private intervalLength = 5000; // 5 seconds
  public currentIndex = 0;

  public ngOnInit(): void {
    this.startAutoAdvance();
  }

  private startAutoAdvance(): void {
    if (this.reviews().length > 1) {
      this.autoAdvanceInterval = setInterval(() => {
        this.showNext();
      }, this.intervalLength);
    }
  }

  private stopAutoAdvance(): void {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  public showPrevious(): void {
    if (this.reviews().length === 0) {
      return;
    }
    this.stopAutoAdvance();
    this.currentIndex = (this.currentIndex - 1 + this.reviews().length) % this.reviews().length;
    this.changeDetectorRef.markForCheck();
    this.startAutoAdvance();
  }

  public showNext(): void {
    if (this.reviews().length === 0) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.reviews().length;
    this.changeDetectorRef.markForCheck();
  }
}
