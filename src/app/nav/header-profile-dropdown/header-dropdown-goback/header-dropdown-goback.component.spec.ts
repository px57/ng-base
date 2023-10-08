import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDropdownGobackComponent } from './header-dropdown-goback.component';

describe('HeaderDropdownGobackComponent', () => {
  let component: HeaderDropdownGobackComponent;
  let fixture: ComponentFixture<HeaderDropdownGobackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDropdownGobackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDropdownGobackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
