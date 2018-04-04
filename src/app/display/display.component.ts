

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';
import { BaconPath } from '../shared/bacon-path';


@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnDestroy {
	path: BaconPath;
	pathStr: string[];
	subscription: Subscription;

	constructor(
		private state: StateService,
		private dispatch: DispatchService
	) {
		this.subscription = state.getPath((path: BaconPath) => {
			this.path = path;
			this.pathString();
		});
	}

	pathString() {
		this.pathStr = this.path.nodes.reduce((arr, { actor, movie }) => {
			movie = movie ? movie.title + ' - ' + movie.year : '';
			return arr.concat([actor.name + ' - ' + actor.birthDeath, movie]);
		}, []);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

