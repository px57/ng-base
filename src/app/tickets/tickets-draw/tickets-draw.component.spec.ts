import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsDrawComponent } from './tickets-draw.component';

describe('TicketsDrawComponent', () => {
  let component: TicketsDrawComponent;
  let fixture: ComponentFixture<TicketsDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
