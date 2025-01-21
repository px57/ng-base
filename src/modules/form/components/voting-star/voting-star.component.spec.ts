import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingStarComponent } from './voting-star.component';

describe('VotingStarComponent', () => {
  let component: VotingStarComponent;
  let fixture: ComponentFixture<VotingStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
