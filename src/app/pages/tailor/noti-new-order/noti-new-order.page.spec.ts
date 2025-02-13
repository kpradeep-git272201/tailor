import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotiNewOrderPage } from './noti-new-order.page';

describe('NotiNewOrderPage', () => {
  let component: NotiNewOrderPage;
  let fixture: ComponentFixture<NotiNewOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiNewOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
