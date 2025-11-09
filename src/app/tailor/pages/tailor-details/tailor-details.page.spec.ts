import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TailorDetailsPage } from './tailor-details.page';

describe('TailorDetailsPage', () => {
  let component: TailorDetailsPage;
  let fixture: ComponentFixture<TailorDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
