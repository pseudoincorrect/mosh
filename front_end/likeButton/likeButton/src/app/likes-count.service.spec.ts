import { TestBed, inject } from '@angular/core/testing';

import { LikesCountService } from './likes-count.service';

describe('LikesCountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LikesCountService]
    });
  });

  it('should be created', inject([LikesCountService], (service: LikesCountService) => {
    expect(service).toBeTruthy();
  }));
});
