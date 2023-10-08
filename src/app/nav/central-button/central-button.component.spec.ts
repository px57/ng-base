import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralButtonComponent } from './central-button.component';

describe('CentralButtonComponent', () => {
  let component: CentralButtonComponent;
  let fixture: ComponentFixture<CentralButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
