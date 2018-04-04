

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../core/state.service';
import { ActorID } from '../shared/actor';


@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy {
	private searchTerm: ActorID;
	private subscription: Subscription;

	constructor(private state: StateService) {
		this.subscription = state.getSearchTerm().subscribe((searchTerm) => (
			this.searchTerm = typeof searchTerm === 'number' ? `index: ${searchTerm}` : searchTerm
		));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

