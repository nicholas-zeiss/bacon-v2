
import { TestBed, async, inject } from '@angular/core/testing';

import { ChooseGuard } from './choose.guard';

describe('ChooseGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ChooseGuard]
		});
	});

	it('should ...', inject([ChooseGuard], (guard: ChooseGuard) => {
		expect(guard).toBeTruthy();
	}));
});
