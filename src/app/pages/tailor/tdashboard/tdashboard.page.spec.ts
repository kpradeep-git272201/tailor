import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TdashboardPage } from './tdashboard.page';

describe('TdashboardPage', () => {
  let component: TdashboardPage;
  let fixture: ComponentFixture<TdashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
