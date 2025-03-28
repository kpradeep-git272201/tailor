import { TestBed } from '@angular/core/testing';

import { WithfabricService } from './withfabric.service';

describe('WithfabricService', () => {
  let service: WithfabricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithfabricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
