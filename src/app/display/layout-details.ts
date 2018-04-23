

import { ArrowDetails, getArrowDetails } from './movie-details/arrow-details';
import { Actor } from '../shared/actor';
import { Movie } from '../shared/movie';


export interface DetailNode {
	actor?: Actor;
	hidden: boolean;
	movie?: Movie;
	rowIndex: number;
	type: NodeType;
}


export class NodeRow {
	classNames: string[] = ['row'];
	nodes: DetailNode[] = [];
	styles = { display: 'none' };

	constructor(index: number) {
		if (index === 0) {
			this.classNames.push('first-row');
		} else if (index % 2) {
			this.classNames.push('arrow-row');
		} else if (index === 2) {
			this.classNames.push('reverse-row');
		}
	}

	show() {
		delete this.styles.display;
	}
}


export enum NodeType {
	actor = 'actor',
	downOnLeft = 'downOnLeft',
	downOnRight = 'downOnRight',
	left = 'left',
	leftCenter = 'leftCenter',
	leftCenterLong = 'leftCenterLong',
	leftShort = 'leftShort',
	right = 'right',
	rightCenter = 'rightCenter',
	rightCenterLong = 'rightCenterLong',
	rightCenterShort = 'rightCenterShort',
	rightShort = 'rightShort'
}


export function getNodeTypes(numOfNodes: number): NodeType[] {
	switch (numOfNodes) {
		case 3:
			return [
				NodeType.actor,
				NodeType.right,
				NodeType.actor
			];

		case 5:
			return [
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor
			];

		case 7:
			return [
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.rightCenterLong,
				NodeType.actor
			];

		case 9:
			return [
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.rightCenterShort,
				NodeType.actor,
				NodeType.leftShort,
				NodeType.actor
			];

		case 11:
			return [
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.downOnRight,
				NodeType.actor,
				NodeType.leftShort,
				NodeType.actor,
				NodeType.leftShort,
				NodeType.actor
			];

		case 13:
			return [
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.rightShort,
				NodeType.actor,
				NodeType.downOnRight,
				NodeType.actor,
				NodeType.leftShort,
				NodeType.actor,
				NodeType.leftShort,
				NodeType.actor,
				NodeType.leftCenterLong,
				NodeType.actor
			];
	}
}

