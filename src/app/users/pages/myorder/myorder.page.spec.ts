import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyorderPage } from './myorder.page';

describe('MyorderPage', () => {
  let component: MyorderPage;
  let fixture: ComponentFixture<MyorderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
