/**
 *
 *	This component displays bacon paths visually to the user. Upon initialization, the user scroll is disabled and the
 *	actor/movie nodes of the bacon path are displayed one by one. When the bottom row overflows the page is scrolled automatically.
 *	Once all nodes have displayed the scroll and input are unlocked, or the user can hit reset to return to the home page.
 *
**/


import { Component, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';

import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';
import { Actor, BaconPath, BaconPathNode, Movie } from '../shared/models';
import { deepEquals } from '../shared/utils';
import { DeviceWidth, getNodeTypes, NodeRow, NodeType } from './layout-details';


// Max number of nodes per row for the current window size
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
	name: string;																			// Name of the actor whose path is being displayed
	nodeRows: NodeRow[] = [];
	rowAddedEmitter = new EventEmitter<number>();			// Supplied to our AutoScrollDirective to trigger a scroll event
	scrollLock = true;																// Whether user scroll is currently disabled
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
			.subscribe((path: BaconPath): void => {
				if (!path) {
					return;
				}

				this.name = path[0].actor.name;
				this.nodeRows = [];
				this.scrollLock = true;

				const numNodes = path.length * 2 - 1;
				const nodeTypes = getNodeTypes(numNodes, this.width);

				path.forEach((node: BaconPathNode, i: number): void => {
					this.addActor(node.actor, 2 * i);
					node.movie ? this.addMovie(node.movie, 2 * i + 1, nodeTypes) : null;
				});

				// initializes the first node
				setTimeout(() => this.showNode(0, 0), 0);
			});
	}


	// Returns the index of the row an actor/movie node is located in given the node's index
	// in the overall collection of actor/movie nodes.
	getRowIndex(nI: number): number {
		const rI = ROW_LENGTHS[this.width];
		return 2 * Math.floor(nI / (rI + 1)) + Math.floor((nI % (rI + 1)) / rI);
	}


	addActor(actor: Actor, index: number): void {
		const actorRow = this.getRowIndex(index);

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
		const movieRow = this.getRowIndex(index);

		const movieNode = {
			hidden: true,
			rowIndex: movieRow,
			type: nodeTypes[index],
			movie
		};

		this.nodeRows[movieRow] = this.nodeRows[movieRow] || new NodeRow(movieRow, this.width);
		this.nodeRows[movieRow].nodes.push(movieNode);
	}


	// Displays a node, and upon completion, sets up the next node to be displayed, or unlocks
	// user input if finished.
	showNode(rowIndex: number, nodeIndex: number): void {
		const row = this.nodeRows[rowIndex];

		row.show();
		row.nodes[nodeIndex].hidden = false;
		this.rowAddedEmitter.emit(rowIndex);

		if (nodeIndex < row.nodes.length - 1) {
			setTimeout(() => this.showNode(rowIndex, nodeIndex + 1), 1000);
		} else if (rowIndex < this.nodeRows.length - 1) {
			setTimeout(() => this.showNode(rowIndex + 1, 0), 1000);
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

