import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhishComponent } from './whish.component';

describe('WhishComponent', () => {
  let component: WhishComponent;
  let fixture: ComponentFixture<WhishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
