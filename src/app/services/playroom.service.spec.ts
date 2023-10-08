import { TestBed } from '@angular/core/testing';

import { PlayroomService } from './playroom.service';

describe('PlayroomService', () => {
  let service: PlayroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
