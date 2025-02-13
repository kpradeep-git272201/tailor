import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdashboardPage } from './cdashboard.page';

describe('CdashboardPage', () => {
  let component: CdashboardPage;
  let fixture: ComponentFixture<CdashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
