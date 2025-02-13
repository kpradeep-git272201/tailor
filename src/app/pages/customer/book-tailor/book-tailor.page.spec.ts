import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTailorPage } from './book-tailor.page';

describe('BookTailorPage', () => {
  let component: BookTailorPage;
  let fixture: ComponentFixture<BookTailorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTailorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
