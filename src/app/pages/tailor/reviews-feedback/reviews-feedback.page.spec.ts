import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsFeedbackPage } from './reviews-feedback.page';

describe('ReviewsFeedbackPage', () => {
  let component: ReviewsFeedbackPage;
  let fixture: ComponentFixture<ReviewsFeedbackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
