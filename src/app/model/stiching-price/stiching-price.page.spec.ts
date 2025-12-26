import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StichingPricePage } from './stiching-price.page';

describe('StichingPricePage', () => {
  let component: StichingPricePage;
  let fixture: ComponentFixture<StichingPricePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StichingPricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
