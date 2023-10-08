import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsRotateLineComponent } from './tickets-rotate-line.component';

describe('TicketsRotateLineComponent', () => {
  let component: TicketsRotateLineComponent;
  let fixture: ComponentFixture<TicketsRotateLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsRotateLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsRotateLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
