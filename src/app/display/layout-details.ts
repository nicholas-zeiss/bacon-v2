/**
 *
 *	Provides various models that we use in the display component to visually present an actors path to bacon. The path
 *	is visualized by actor nodes connected to each other by movie nodes, which are represented visually as arrows via svg
 *	elements. These nodes are displayed and held in rows which have a corresponding row class. Actor nodes and movie nodes
 *	implement the DetailNode interface, and are inserted into instances of the NodeRow class. These actor/movie nodes are rendered
 *	via the ActorDetailsComponent and MovieDetailsComponent. The NodeType enum specifies the type of a DetailNode (either simply actor,
 *	or if a movie, which type of arrow it is). The layout is highly dependent on the number of nodes in the bacon path as well as
 *	the width of the window it is being displayed in. The getNodeTypes function is supplied to generate an array of these types
 *	given the width of the window and the number of nodes in the path.
 *
 *	Nodes are displayed one by one, and are hidden before hand. When a row comes into view that is below the current scrollHeight,
 *	it is scrolled to automatically.
 *
**/


import { Actor, Movie } from '../shared/models';


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


export interface DetailNode {
	actor?: Actor;
	hidden: boolean;		// whether the node is visible to the user
	movie?: Movie;
	rowIndex: number;		// index of the row in which the node is stored
	type: NodeType;
}


// As nodes are displayed one by one and scrolled to automatically, rows are initially not displayed
// so that they do not take up any rendered space on the page.
export class NodeRow {
	classNames: string[] = ['row'];		// css classes
	nodes: DetailNode[] = [];
	styles = { display: 'none' };

	constructor(index: number, width: DeviceWidth) {
		if (index === 0) {
			// first row nodes have a special animation and the row itself specific css for it
			this.classNames.push('first-row');

		} else if (index % 2) {
			// this row contains only a single vertical arrow

			if (width === DeviceWidth.medium) {
				// the arrow is either on the right or left side and must be aligned as such
				this.styles['justify-content'] = index === 3 ? 'flex-start' : 'flex-end';
			}

			this.classNames.push('arrow-row');

		} else if (index === 2) {
			// the nodes proceed in this row from right to left
			this.classNames.push('reverse-row');
		}
	}

	show() {
		delete this.styles.display;
	}
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


// Given the total number of actor/movie nodes in the path, and width of the device,
// returns the corresponding node types.
export const getNodeTypes = (num: number, width: DeviceWidth): NodeType[] => (
	NODE_TYPES[width][num]
);


