import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckLetterComponent } from './luck-letter.component';

describe('LuckLetterComponent', () => {
  let component: LuckLetterComponent;
  let fixture: ComponentFixture<LuckLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuckLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuckLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
