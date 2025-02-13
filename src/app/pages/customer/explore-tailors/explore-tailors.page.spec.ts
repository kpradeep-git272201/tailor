import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreTailorsPage } from './explore-tailors.page';

describe('ExploreTailorsPage', () => {
  let component: ExploreTailorsPage;
  let fixture: ComponentFixture<ExploreTailorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreTailorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
