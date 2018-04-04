

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../core/state.service';
import { SearchError } from '../shared/search-error';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
	private error: SearchError;
	private subscription: Subscription;

	constructor (private state: StateService) {
		this.subscription = state.getSearchError().subscribe(err => this.error = err);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

