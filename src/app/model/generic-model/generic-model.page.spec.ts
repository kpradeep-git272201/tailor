import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericModelPage } from './generic-model.page';

describe('GenericModelPage', () => {
  let component: GenericModelPage;
  let fixture: ComponentFixture<GenericModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
