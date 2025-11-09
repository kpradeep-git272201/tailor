import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SizeModelPage } from './size-model.page';

describe('SizeModelPage', () => {
  let component: SizeModelPage;
  let fixture: ComponentFixture<SizeModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
