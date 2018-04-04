

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
	pathStr: any[];
	subscription: Subscription;

	constructor(
		private state: StateService,
		private dispatch: DispatchService
	) {
		this.subscription = state.getPath().subscribe(path => {
			this.path = path;
			this.pathString();
		});
	}

	pathString() {
		// this.pathStr = this.path.nodes.reduce((arr, node): string[] => {
		// 	const actor: string = node.actor.name + ' - ' + node.actor.birthDeath;
		// 	const movie: string = node.movie ? node.movie.title + ' - ' + String(node.movie.year) : '';
		// 	return arr.concat([actor, movie]);
		// }, []);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

