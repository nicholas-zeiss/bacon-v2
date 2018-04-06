

import { ArrowDetails, getArrowDetails } from './movie-details/arrow-details';
import { Actor } from '../shared/actor';
import { Movie } from '../shared/movie';


export abstract class DetailNode {
	classNames: string[];
	rowIndex: number;
	visibility: 'firstHiddenActor' | 'firstHiddenMovie' | 'firstHiddenMovieShort' | 'hidden' | 'visible';
	type: NodeTypes;

	show() {
		this.visibility = 'visible';
	}
}


export class ActorNode extends DetailNode {
	classNames = [];
	type: NodeTypes = 'actor';

	constructor(public actor: Actor, public rowIndex: number) {
		super();
		this.visibility = rowIndex ? 'hidden' : 'firstHiddenActor';
	}
}


export class MovieNode extends DetailNode {
	arrowDetails: ArrowDetails;
	classNames = ['movie-details'];

	constructor(public movie: Movie, public type: NodeTypes, public rowIndex: number) {
		super();

		/Short/.test(type) ? this.classNames.push('short') : null;
		/down|Center/.test(type) ? this.classNames.push('arrow-row') : null;	// or see if rowIndex odd
		type === 'downOnRight' ? this.classNames.push('float-right') : null;

		this.arrowDetails = getArrowDetails(type);
		this.visibility = !rowIndex ? /Short/.test(type) ? 'firstHiddenMovieShort' : 'firstHiddenMovie' : 'hidden';
	}
}


export class NodeRow {
	classNames: string[] = ['row'];
	visibility: 'hidden' | 'visible' = 'hidden';
	nodes: DetailNode[] = [];

	constructor(index: number) {
		if (index === 0) {
			this.classNames.push('first-row');
		} else if (index % 2) {
			this.classNames.push('arrow-row');
		} else if (index === 2) {
			this.classNames.push('reverse-row');
		}
	}
}


export type NodeTypes = (
		'actor'
	| 'downOnLeft'
	| 'downOnRight'
	| 'left'
	| 'leftCenter'
	| 'leftCenterLong'
	| 'leftShort'
	| 'right'
	| 'rightCenter'
	| 'rightCenterLong'
	| 'rightCenterShort'
	| 'rightShort'
);


export function getNodeTypes(numOfNodes: number): NodeTypes[] {
	switch (numOfNodes) {
		case 3:
			return [
				'actor',
				'right',
				'actor'
			];

		case 5:
			return [
				'actor',
				'rightShort',
				'actor',
				'rightShort',
				'actor'
			];

		case 7:
			return [
				'actor',
				'rightShort',
				'actor',
				'rightShort',
				'actor',
				'rightCenterLong',
				'actor'
			];

		case 9:
			return [
				'actor',
				'rightShort',
				'actor',
				'rightShort',
				'actor',
				'rightCenterShort',
				'actor',
				'leftShort',
				'actor'
			];

		case 11:
			return [
				'actor',
				'rightShort',
				'actor',
				'rightShort',
				'actor',
				'downOnRight',
				'actor',
				'leftShort',
				'actor',
				'leftShort',
				'actor'
			];

		case 13:
			return [
				'actor',
				'rightShort',
				'actor',
				'rightShort',
				'actor',
				'downOnRight',
				'actor',
				'leftShort',
				'actor',
				'leftShort',
				'actor',
				'leftCenterLong',
				'actor'
			];
	}
}

