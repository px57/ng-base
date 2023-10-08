import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarVotingSpaceComponent } from './star-voting-space.component';

describe('StarVotingSpaceComponent', () => {
  let component: StarVotingSpaceComponent;
  let fixture: ComponentFixture<StarVotingSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarVotingSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarVotingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
