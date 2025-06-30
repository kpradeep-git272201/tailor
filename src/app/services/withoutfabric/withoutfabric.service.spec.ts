import { TestBed } from '@angular/core/testing';

import { WithoutfabricService } from './withoutfabric.service';

describe('WithoutfabricService', () => {
  let service: WithoutfabricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithoutfabricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
