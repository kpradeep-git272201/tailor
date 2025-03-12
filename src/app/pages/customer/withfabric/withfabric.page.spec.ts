import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithfabricPage } from './withfabric.page';

describe('WithfabricPage', () => {
  let component: WithfabricPage;
  let fixture: ComponentFixture<WithfabricPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WithfabricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
