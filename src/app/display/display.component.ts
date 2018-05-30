

import { Component, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';

import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';
import { Actor, BaconPath, BaconPathNode, Movie } from '../shared/models';
import { deepEquals } from '../shared/utils';
import { DeviceWidth, getNodeTypes, NodeRow, NodeType } from './layout-details';


const ROW_LENGTHS = {
	[DeviceWidth.medium]: 5,
	[DeviceWidth.small]: 3
};


@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnDestroy {
	name: string;
	nodeRows: NodeRow[] = [];
	rowAddedEmitter = new EventEmitter<number>();
	scrollLock = true;
	subscription: Subscription;
	width: DeviceWidth;


	constructor(
		private dispatch: DispatchService,
		appState: StateService
	) {
		if (window.innerWidth < 800) {
			this.width = DeviceWidth.small;
		} else {
			this.width = DeviceWidth.medium;
		}

		this.subscription = appState
			.getCurrBaconPath()
			.distinctUntilChanged(deepEquals)
			.subscribe((path: BaconPath): void => {
				if (!path) {
					return;
				}

				this.name = path[0].actor.name;
				this.nodeRows = [];
				this.scrollLock = true;

				const nodeTypes = getNodeTypes(path.length * 2 - 1, this.width);

				path.forEach((node: BaconPathNode, i: number): void => {
					this.addActor(node.actor, i);
					node.movie ? this.addMovie(node.movie, i, nodeTypes) : null;
				});

				setTimeout(() => this.showNode(0, 0), 0);
			});
	}


	getRowIndex(nI: number): number {
		const rI = ROW_LENGTHS[this.width];
		return 2 * Math.floor(nI / (rI + 1)) + Math.floor((nI % (rI + 1)) / rI);
	}


	addActor(actor: Actor, index: number): void {
		const actorRow = this.getRowIndex(2 * index);

		const actorNode = {
			hidden: true,
			rowIndex: actorRow,
			type: NodeType.actor,
			actor
		};

		this.nodeRows[actorRow] = this.nodeRows[actorRow] || new NodeRow(actorRow, this.width);
		this.nodeRows[actorRow].nodes.push(actorNode);
	}


	addMovie(movie: Movie, index: number, nodeTypes: NodeType[]): void {
		const movieRow = this.getRowIndex(2 * index + 1);

		const movieNode = {
			hidden: true,
			rowIndex: movieRow,
			type: nodeTypes[2 * index + 1],
			movie
		};

		this.nodeRows[movieRow] = this.nodeRows[movieRow] || new NodeRow(movieRow, this.width);
		this.nodeRows[movieRow].nodes.push(movieNode);
	}


	showNode(rI: number, nI: number): void {
		const row = this.nodeRows[rI];

		row.show();
		row.nodes[nI].hidden = false;
		this.rowAddedEmitter.emit(rI);

		if (nI < row.nodes.length - 1) {
			setTimeout(() => this.showNode(rI, nI + 1), 1000);
		} else if (rI < this.nodeRows.length - 1) {
			setTimeout(() => this.showNode(rI + 1, 0), 1000);
		} else {
			this.scrollLock = false;
			this.dispatch.enableInput();
		}
	}


	reset(): void {
		this.dispatch.setViewHome();
	}


	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

