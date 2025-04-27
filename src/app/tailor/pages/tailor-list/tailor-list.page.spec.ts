import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TailorListPage } from './tailor-list.page';

describe('TailorListPage', () => {
  let component: TailorListPage;
  let fixture: ComponentFixture<TailorListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
