import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopRatedFabricPage } from './top-rated-fabric.page';

describe('TopRatedFabricPage', () => {
  let component: TopRatedFabricPage;
  let fixture: ComponentFixture<TopRatedFabricPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedFabricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
