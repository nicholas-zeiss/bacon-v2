

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { ActorNode, DetailNode, getNodeTypes, MovieNode, NodeRow } from './layout-details';
import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';
import { Actor, isActor } from '../shared/actor';
import { BaconPath, BaconPathNode } from '../shared/bacon-path';
import { Movie } from '../shared/movie';


// TODO: MAKE RESPONSIVE
const rowLength = 5;

const getRowIndex = (pathIndex) => (
	2 * Math.floor(pathIndex / (rowLength + 1)) + Math.floor((pathIndex % (rowLength + 1)) / rowLength)
);


@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnDestroy {
	private name: string;
	private nodeRows: NodeRow[] = [];
	private subscription: Subscription;

	constructor(
		private state: StateService,
		private dispatch: DispatchService
	) {
		this.subscription = state
			.getCurrBaconPath()
			.first()
			.subscribe(path => {
				if (!path) {
					return;
				}

				const nodeTypes = getNodeTypes(path.length * 2 - 1);
				this.name = path[0].actor.name;

				path
					.reduce((flat, { actor, movie }, i) => {
						flat.push(new ActorNode(actor));

						if (movie) {
							flat.push(new MovieNode(movie, nodeTypes[2 * i + 1]));
						}

						return flat;
					}, [])
					.forEach((node, i) => {
						const rowIndex = getRowIndex(i);
						this.nodeRows[rowIndex] = this.nodeRows[rowIndex] || new NodeRow(rowIndex);
						this.nodeRows[rowIndex].nodes.push(node);
					});
 			});
	}


	reset() {
		this.dispatch.setViewHome();
		this.dispatch.enableInput();
		this.dispatch.setCurrBaconPath(null);
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

