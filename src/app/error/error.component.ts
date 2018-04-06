

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';
import { SearchError } from '../shared/search-error';


@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {
	private error: SearchError;
	private subscription: Subscription;

	constructor(
		private dispatch: DispatchService,
		state: StateService
	) {
		this.subscription = state
			.getSearchError()
			.subscribe(err => this.error = err);
	}


	reset() {
		this.dispatch.setSearchError(null);
		this.dispatch.setViewHome();
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

