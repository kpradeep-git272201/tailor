import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartModelPage } from './chart-model.page';

describe('ChartModelPage', () => {
  let component: ChartModelPage;
  let fixture: ComponentFixture<ChartModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
