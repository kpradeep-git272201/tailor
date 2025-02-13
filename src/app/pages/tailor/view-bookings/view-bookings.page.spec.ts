import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewBookingsPage } from './view-bookings.page';

describe('ViewBookingsPage', () => {
  let component: ViewBookingsPage;
  let fixture: ComponentFixture<ViewBookingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
