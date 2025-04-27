import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultDashboradPage } from './default-dashborad.page';

describe('DefaultDashboradPage', () => {
  let component: DefaultDashboradPage;
  let fixture: ComponentFixture<DefaultDashboradPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultDashboradPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
