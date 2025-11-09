import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TailorProfilePage } from './tailor-profile.page';

describe('TailorProfilePage', () => {
  let component: TailorProfilePage;
  let fixture: ComponentFixture<TailorProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
