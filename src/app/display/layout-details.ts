

import { Actor, Movie } from '../shared/models';


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

	constructor(index: number, width: DeviceWidth) {
		if (index === 0) {
			this.classNames.push('first-row');
		} else if (index % 2) {
			if (width === DeviceWidth.medium) {
				this.styles['justify-content'] = index === 3 ? 'flex-start' : 'flex-end';
			}

			this.classNames.push('arrow-row');

		} else if (index === 2) {
			this.classNames.push('reverse-row');
		}
	}

	show() {
		delete this.styles.display;
	}
}


export enum DeviceWidth {
	'small',
	'medium'
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


const MEDIUM_NODE_TYPES = {
	3: [
		NodeType.actor,
		NodeType.right,
		NodeType.actor
	],
	5: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor
	],
	7: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.rightCenterLong,
		NodeType.actor
	],
	9: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.rightCenterShort,
		NodeType.actor,
		NodeType.leftShort,
		NodeType.actor
	],
	11: [
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
	],
	13: [
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
	]
};


const SMALL_NODE_TYPES = {
	3: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor
	],
	5: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.rightCenter,
		NodeType.actor
	],
	7: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.downOnRight,
		NodeType.actor,
		NodeType.leftShort,
		NodeType.actor
	],
	9: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.downOnRight,
		NodeType.actor,
		NodeType.leftShort,
		NodeType.actor,
		NodeType.leftCenter,
		NodeType.actor
	],
	11: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.downOnRight,
		NodeType.actor,
		NodeType.leftShort,
		NodeType.actor,
		NodeType.downOnLeft,
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor
	],
	13: [
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.downOnRight,
		NodeType.actor,
		NodeType.leftShort,
		NodeType.actor,
		NodeType.downOnLeft,
		NodeType.actor,
		NodeType.rightShort,
		NodeType.actor,
		NodeType.rightCenter,
		NodeType.actor
	]
};


const NODE_TYPES = {
	[DeviceWidth.small]: SMALL_NODE_TYPES,
	[DeviceWidth.medium]: MEDIUM_NODE_TYPES
};


export const getNodeTypes = (num: number, width: DeviceWidth): NodeType[] => (
	NODE_TYPES[width][num]
);


