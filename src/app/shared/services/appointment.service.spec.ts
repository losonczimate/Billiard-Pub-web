import { TestBed } from '@angular/core/testing';

import { appointmentService } from './appointmentService';

describe('IdopontService', () => {
  let service: appointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(appointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});