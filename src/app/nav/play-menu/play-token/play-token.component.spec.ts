import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTokenComponent } from './play-token.component';

describe('PlayTokenComponent', () => {
  let component: PlayTokenComponent;
  let fixture: ComponentFixture<PlayTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
