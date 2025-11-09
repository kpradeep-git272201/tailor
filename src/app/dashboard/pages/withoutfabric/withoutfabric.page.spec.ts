import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithoutfabricPage } from './withoutfabric.page';

describe('WithoutfabricPage', () => {
  let component: WithoutfabricPage;
  let fixture: ComponentFixture<WithoutfabricPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutfabricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
