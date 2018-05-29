

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy {
	name: string;

	private subscription: Subscription;

	constructor(state: StateService) {
		this.subscription = state
			.getSearchName()
			.subscribe(name => this.name = name);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

