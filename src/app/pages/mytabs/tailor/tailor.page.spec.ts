import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TailorPage } from './tailor.page';

describe('TailorPage', () => {
  let component: TailorPage;
  let fixture: ComponentFixture<TailorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
