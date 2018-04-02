import { TestBed, async, inject } from '@angular/core/testing';

import { DisplayGuard } from './display.guard';

describe('DisplayGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DisplayGuard]
		});
	});

	it('should ...', inject([DisplayGuard], (guard: DisplayGuard) => {
		expect(guard).toBeTruthy();
	}));
});
