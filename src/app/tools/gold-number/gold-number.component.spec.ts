import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldNumberComponent } from './gold-number.component';

describe('GoldNumberComponent', () => {
  let component: GoldNumberComponent;
  let fixture: ComponentFixture<GoldNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
