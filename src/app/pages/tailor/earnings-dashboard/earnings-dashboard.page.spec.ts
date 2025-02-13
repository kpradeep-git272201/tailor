import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EarningsDashboardPage } from './earnings-dashboard.page';

describe('EarningsDashboardPage', () => {
  let component: EarningsDashboardPage;
  let fixture: ComponentFixture<EarningsDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
