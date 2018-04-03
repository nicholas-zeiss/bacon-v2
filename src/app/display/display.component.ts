

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../core/state.service';
import { Actor } from '../shared/actor';
import { BaconPath, BaconPathNode } from '../shared/bacon-path';
import { Movie } from '../shared/movie';


@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnDestroy {
	path: BaconPath;
	pathStr: string[];
	subscription: Subscription;

	constructor(private state: StateService) {
		this.subscription = state.path.subscribe((path: BaconPath) => {
			this.path = path;
			this.pathString();
		});
	}

	pathString(): void {
		this.pathStr = this.path.nodes.reduce((arr, {actor, movie}: BaconPathNode): string[] => {
			movie = movie ? movie.title + ' - ' + movie.year : '';
			return arr.concat([actor.name + ' - ' + actor.birthDeath, movie]);
		}, []);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

