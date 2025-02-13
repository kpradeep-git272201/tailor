import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMngtPage } from './profile-mngt.page';

describe('ProfileMngtPage', () => {
  let component: ProfileMngtPage;
  let fixture: ComponentFixture<ProfileMngtPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMngtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
