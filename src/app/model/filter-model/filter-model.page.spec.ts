import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterModelPage } from './filter-model.page';

describe('FilterModelPage', () => {
  let component: FilterModelPage;
  let fixture: ComponentFixture<FilterModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
