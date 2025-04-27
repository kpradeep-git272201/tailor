import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopRatedTailorPage } from './top-rated-tailor.page';

describe('TopRatedTailorPage', () => {
  let component: TopRatedTailorPage;
  let fixture: ComponentFixture<TopRatedTailorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedTailorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
