import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLetterBoldTextComponent } from './first-letter-bold-text.component';

describe('FirstLetterBoldTextComponent', () => {
  let component: FirstLetterBoldTextComponent;
  let fixture: ComponentFixture<FirstLetterBoldTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstLetterBoldTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstLetterBoldTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
