import { TestBed } from '@angular/core/testing';

import { WebsocketanimationService } from './websocketanimation.service';

describe('WebsocketanimationService', () => {
  let service: WebsocketanimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketanimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
