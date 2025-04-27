import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorModelPage } from './color-model.page';

describe('ColorModelPage', () => {
  let component: ColorModelPage;
  let fixture: ComponentFixture<ColorModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
