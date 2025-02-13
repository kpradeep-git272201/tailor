import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptRejectOrdersPage } from './accept-reject-orders.page';

describe('AcceptRejectOrdersPage', () => {
  let component: AcceptRejectOrdersPage;
  let fixture: ComponentFixture<AcceptRejectOrdersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRejectOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
