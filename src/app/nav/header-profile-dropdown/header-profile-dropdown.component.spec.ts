import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProfileDropdownComponent } from './header-profile-dropdown.component';

describe('HeaderProfileDropdownComponent', () => {
  let component: HeaderProfileDropdownComponent;
  let fixture: ComponentFixture<HeaderProfileDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderProfileDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderProfileDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
