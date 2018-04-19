

import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, state, keyframes, style, animate, transition } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { ActorNode, getNodeTypes, MovieNode, NodeRow } from './layout-details';
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
	// animations: [
	// 	trigger('detailNode', [
	// 		state('firstHiddenActor', style({ display: 'none' })),
	// 		state('firstHiddenMovie', style({ display: 'none' })),
	// 		state('firstHiddenMovieShort', style({ display: 'none' })),
	// 		state('hidden', style({ visibility: 'hidden' })),
	// 		state('visible', style({ visibility: 'visible' })),
	// 		transition('firstHiddenActor => visible', [
	// 			animate(1000, keyframes([
	// 				style({ opacity: 0, width: '0rem', offset:  0}),
	// 				style({ opacity: 0, width: '10.5rem', offset:  .5}),
	// 				style({ opacity: 1, width: '10.5rem', offset: 1 })
	// 			]))
	// 		]),
	// 		transition('firstHiddenMovie => visible', [
	// 			animate(1000, keyframes([
	// 				style({ opacity: 0, width: '0rem', offset: 0 }),
	// 				style({ opacity: 0, width: '15.5rem', offset: .5 }),
	// 				style({ opacity: 1, width: '15.5rem', offset: 1 })
	// 			]))
	// 		]),
	// 		transition('firstHiddenMovieShort => visible', [
	// 			animate(1000, keyframes([
	// 				style({ opacity: 0, width: '0rem', offset: 0 }),
	// 				style({ opacity: 0, width: '8.5rem', offset: .5 }),
	// 				style({ opacity: 1, width: '8.5rem', offset: 1 })
	// 			]))
	// 		]),
	// 		transition('hidden => visible', [
	// 			animate(1000, keyframes([
	// 				style({ visibility: 'visible', opacity: 0 }),
	// 				style({ visibility: 'visible', opacity: 5 })
	// 			]))
	// 		])
	// 	]),
	// ],
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

	constructor(
		private appState: StateService,
		private dispatch: DispatchService
	) {
		this.subscription = appState
			.getCurrBaconPath()
			.first()
			.subscribe(path => {
				if (!path) {
					return;
				}

				const nodeTypes = getNodeTypes(path.length * 2 - 1);
				this.name = path[0].actor.name;

				const flattened = path.reduce((flat, { actor, movie }, i) => {
					const actorRow = getRowIndex(2 * i);
					const actorNode = new ActorNode(actor, actorRow);

					flat.push(actorNode);
					this.nodeRows[actorRow] = this.nodeRows[actorRow] || new NodeRow(actorRow);
					this.nodeRows[actorRow].nodes.push(actorNode);

					if (movie) {
						const movieRow = getRowIndex(2 * i + 1);
						const movieNode = new MovieNode(movie, nodeTypes[2 * i + 1], movieRow);

						flat.push(movieNode);
						this.nodeRows[movieRow] = this.nodeRows[movieRow] || new NodeRow(movieRow);
						this.nodeRows[movieRow].nodes.push(movieNode);
					}

					return flat;
				}, []);

				// TODO: CLEAR THESE ON DESTROY
				flattened.forEach((node, i) => {
					const row = this.nodeRows[getRowIndex(i)];
					row.show();

					setTimeout(() => {
						this.rowAddedEmitter.emit(getRowIndex(i));

						if (i === flattened.length - 1) {
							this.scrollLock = false;
							this.dispatch.enableInput();
						}

						node.show();
					}, 2000 * i);
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

