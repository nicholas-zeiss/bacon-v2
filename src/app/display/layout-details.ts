

import { ArrowDetails, getArrowDetails } from './movie-details/arrow-details';
import { Actor } from '../shared/actor';
import { Movie } from '../shared/movie';


export interface DetailNode {
	classNames: string[];
	hidden: boolean;
	type: NodeTypes;
}


export class ActorNode implements DetailNode {
	classNames = ['actor-containter'];
	hidden = true;
	type: NodeTypes = 'actor';

	constructor(public actor: Actor) { }
}


export class MovieNode implements DetailNode {
	arrowDetails: ArrowDetails;
	classNames = ['movie-container'];
	hidden = true;

	constructor (public movie: Movie, public type: NodeTypes) {
		if (/Short/.test(type)) {
			this.classNames.push('short');
		}

		this.arrowDetails = getArrowDetails(type);
	}
}


export class NodeRow {
	classNames: string[] = ['row'];
	hidden = true;
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

