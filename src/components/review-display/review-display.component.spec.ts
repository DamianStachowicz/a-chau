import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewDisplayComponent } from './review-display.component';
import { Review } from './review.interface';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ReviewDisplayComponent', () => {
  let component: ReviewDisplayComponent;
  let fixture: ComponentFixture<ReviewDisplayComponent>;

  const mockReviews: Review[] = [
    { quote: 'Excellent food and service!', author: 'John Doe' },
    { quote: 'Amazing atmosphere and delicious meals.', author: 'Jane Smith' },
    { quote: 'Best restaurant in town!', author: 'Bob Wilson' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDisplayComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewDisplayComponent);
    component = fixture.componentInstance;

    // Install Jasmine clock to mock timers
    jasmine.clock().install();
  });

  afterEach(() => {
    // Uninstall Jasmine clock
    jasmine.clock().uninstall();

    // Clean up any timers
    const componentWithPrivates = component as unknown as {
      autoAdvanceInterval: ReturnType<typeof setInterval> | null;
    };
    if (component && componentWithPrivates.autoAdvanceInterval) {
      clearInterval(componentWithPrivates.autoAdvanceInterval);
    }
  });

  it('handles empty reviews', () => {
    // Set empty reviews array
    fixture.componentRef.setInput('reviews', []);
    fixture.detectChanges();

    // Verify currentIndex stays at 0
    expect(component.currentIndex).toBe(0);

    // Verify no navigation buttons are shown
    const navigationButtons = fixture.debugElement.queryAll(By.css('.reviews__button'));
    expect(navigationButtons.length).toBe(0);

    // Verify no reviews are displayed
    const reviewElements = fixture.debugElement.queryAll(By.css('.review'));
    expect(reviewElements.length).toBe(0);
  });

  it('displays a single review at a time', () => {
    // Set reviews input
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();

    // Check that all reviews are rendered but only first is visible
    const reviewElements = fixture.debugElement.queryAll(By.css('.review'));
    expect(reviewElements.length).toBe(3);

    // Check transform style shows first review (index 0)
    const strip = fixture.debugElement.query(By.css('.reviews__strip'));
    expect(strip.nativeElement.style.transform).toBe('translateX(0%)');

    // Verify first review content is displayed
    const firstReview = reviewElements[0];
    expect(firstReview.query(By.css('.review__quote')).nativeElement.textContent.trim()).toBe(
      'Excellent food and service!'
    );
    expect(firstReview.query(By.css('.review__author')).nativeElement.textContent.trim()).toBe(
      '- John Doe'
    );
  });

  it('auto advances reviews every 5 seconds', () => {
    // Set reviews input
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();

    // Verify initial state
    expect(component.currentIndex).toBe(0);

    // Advance time by 5 seconds
    jasmine.clock().tick(5000);
    fixture.detectChanges();

    // Should advance to next review
    expect(component.currentIndex).toBe(1);
    const strip = fixture.debugElement.query(By.css('.reviews__strip'));
    expect(strip.nativeElement.style.transform).toBe('translateX(-100%)');

    // Advance time by another 5 seconds
    jasmine.clock().tick(5000);
    fixture.detectChanges();

    // Should advance to third review
    expect(component.currentIndex).toBe(2);
    expect(strip.nativeElement.style.transform).toBe('translateX(-200%)');

    // Advance time by another 5 seconds
    jasmine.clock().tick(5000);
    fixture.detectChanges();

    // Should wrap around to first review
    expect(component.currentIndex).toBe(0);
    expect(strip.nativeElement.style.transform).toBe('translateX(0%)');
  });

  it('resets auto-advance timer on manual navigation', () => {
    // Set reviews input
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();

    // Start at first review
    expect(component.currentIndex).toBe(0);

    // Advance time by 3 seconds (not enough for auto advance)
    jasmine.clock().tick(3000);
    expect(component.currentIndex).toBe(0);

    // Use showPrevious (which stops and restarts timer) to test timer reset
    component.showPrevious();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(2); // Should wrap to last review

    // Advance time by 3 seconds from manual navigation
    jasmine.clock().tick(3000);
    expect(component.currentIndex).toBe(2); // Should not have auto-advanced yet

    // Advance time by 2 more seconds (total 5 seconds from manual navigation)
    jasmine.clock().tick(2000);
    fixture.detectChanges();
    expect(component.currentIndex).toBe(0); // Should auto-advance now (wrap to first)

    // Test that showPrevious again resets timer
    jasmine.clock().tick(3000);
    component.showPrevious();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(2); // Back to last review

    // Verify timer was reset - should not advance for another 3 seconds
    jasmine.clock().tick(3000);
    expect(component.currentIndex).toBe(2);

    // But should advance after 5 total seconds from the manual navigation
    jasmine.clock().tick(2000);
    fixture.detectChanges();
    expect(component.currentIndex).toBe(0); // Should advance to first
  });

  it('wraps around to the last review when navigating previous from the first review', () => {
    // Set reviews input
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();

    // Start at first review
    expect(component.currentIndex).toBe(0);

    // Navigate previous should wrap to last review
    component.showPrevious();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(2);
    const strip = fixture.debugElement.query(By.css('.reviews__strip'));
    expect(strip.nativeElement.style.transform).toBe('translateX(-200%)');
  });

  it('wraps around to the first review when navigating next from the last review', () => {
    // Set reviews input
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();

    // Navigate to last review
    component.currentIndex = 2;
    fixture.detectChanges();

    // Navigate next should wrap to first review
    component.showNext();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(0);
    const strip = fixture.debugElement.query(By.css('.reviews__strip'));
    expect(strip.nativeElement.style.transform).toBe('translateX(0%)');
  });

  it('shows navigation buttons when there are multiple reviews', () => {
    // Set reviews input
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();

    // Check navigation buttons are present
    const prevButton = fixture.debugElement.query(By.css('.reviews__button--prev'));
    const nextButton = fixture.debugElement.query(By.css('.reviews__button--next'));

    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
    expect(prevButton.nativeElement.textContent.trim()).toBe('‹');
    expect(nextButton.nativeElement.textContent.trim()).toBe('›');
  });

  it('hides navigation buttons when there is only one review', () => {
    // Set single review
    fixture.componentRef.setInput('reviews', [mockReviews[0]]);
    fixture.detectChanges();

    // Check no navigation buttons are present
    const navigationButtons = fixture.debugElement.queryAll(By.css('.reviews__button'));
    expect(navigationButtons.length).toBe(0);
  });

  it('navigates correctly when clicking navigation buttons', () => {
    // Set reviews input
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(By.css('.reviews__button--prev'));
    const nextButton = fixture.debugElement.query(By.css('.reviews__button--next'));

    // Click next button
    nextButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(1);

    // Click previous button
    prevButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(0);
  });

  it('does not start auto advance with single review', () => {
    // Set single review
    fixture.componentRef.setInput('reviews', [mockReviews[0]]);
    fixture.detectChanges();

    // Advance time by 10 seconds
    jasmine.clock().tick(10000);
    fixture.detectChanges();

    // Should stay at index 0
    expect(component.currentIndex).toBe(0);
  });

  it('does not navigate to next or previous when reviews array is empty', () => {
    // Set empty reviews array
    fixture.componentRef.setInput('reviews', []);
    fixture.detectChanges();

    // Verify currentIndex stays at 0
    expect(component.currentIndex).toBe(0);

    // Call showNext
    component.showNext();
    fixture.detectChanges();

    // Call showPrevious
    expect(component.currentIndex).toBe(0);
    component.showPrevious();
    fixture.detectChanges();

    // currentIndex should still be 0
    expect(component.currentIndex).toBe(0);
  });
});
