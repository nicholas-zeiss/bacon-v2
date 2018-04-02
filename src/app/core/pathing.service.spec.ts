

import { TestBed, inject } from '@angular/core/testing';

import { PathingService } from './pathing.service';

describe('PathingService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PathingService]
		});
	});

	it('should be created', inject([PathingService], (service: PathingService) => {
		expect(service).toBeTruthy();
	}));
});

