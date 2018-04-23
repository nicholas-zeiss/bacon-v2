

import { NodeType } from '../layout-details';


interface Point {
	x: number;
	y: number;
}


interface Text extends Point {
	anchor?: string;
	align?: string;
	height?: number;
	width?: number;
}


export interface ArrowDetails {
	height: number;
	lineEnd: Point;
	lineStart: Point;
	styles: { [index: string]: string };
	tipPoints: string;
	title: Text;
	width: number;
	year: Text;
}


export function getArrowDetails(type: NodeType): ArrowDetails {
	const out = {} as ArrowDetails;

	switch (type) {
		case 'right':
			Object.assign(out, {
				width: 248,
				height: 304,
				lineStart: { x: 5, y: 152 },
				lineEnd: { x: 236, y: 152 },
				year: { x: 108, y: 140, anchor: 'middle' },
				title: { x: 0, y: 160, width: 212, height: 144, align: 'center' },
				styles: {}
			});

			break;

		case 'left':
			Object.assign(out, {
				width: 248,
				height: 304,
				lineStart: { x: 243, y: 152 },
				lineEnd: { x: 12, y: 152 },
				year: { x: 140, y: 140, anchor: 'middle' },
				title: { x: 32, y: 160, width: 212, height: 144, align: 'center' },
				styles: {}
			});

			break;

		case 'downOnLeft':
			Object.assign(out, {
				width: 600,
				height: 240,
				lineStart: { x: 88, y: 5 },
				lineEnd: { x: 88, y: 228 },
				year: { x: 100, y: 100, anchor: 'start' },
				title: { x: 100, y: 110, width: 400, height: 120, align: 'left' },
				styles: {}
			});

			break;

		case 'downOnRight':
			Object.assign(out, {
				width: 600,
				height: 240,
				lineStart: { x: 512, y: 5 },
				lineEnd: { x: 512, y: 228 },
				year: { x: 500, y: 100, anchor: 'end' },
				title: { x: 100, y: 110, width: 400, height: 120, align: 'right' },
				styles: { 'padding-left': '200px' }
			});

			break;

		case 'leftCenter':
			Object.assign(out, {
				width: 600,
				height: 240,
				lineStart: { x: 176, y: 5 },
				lineEnd: { x: 275, y: 228 },
				year: { x: 180, y: 90, anchor: 'middle' },
				title: { x: 60, y: 100, width: 150, height: 140, align: 'right' },
				styles: {}
			});

			break;

		case 'rightCenter':
			Object.assign(out, {
				width: 600,
				height: 240,
				lineStart: { x: 424, y: 5 },
				lineEnd: { x: 325, y: 228 },
				year: { x: 420, y: 90, anchor: 'middle' },
				title: { x: 395, y: 100, width: 150, height: 140, align: 'left' },
				styles: {}
			});

			break;

		case 'leftShort':
			Object.assign(out, {
				width: 136,
				height: 304,
				lineStart: { x: 131, y: 152 },
				lineEnd: { x: 12, y: 152 },
				year: { x: 84, y: 140, anchor: 'middle' },
				title: { x: 32, y: 160, width: 100, height: 144, align: 'center' },
				styles: {}
			});

			break;

		case 'rightShort':
			Object.assign(out, {
				width: 136,
				height: 304,
				lineStart: { x: 5, y: 152 },
				lineEnd: { x: 124, y: 152 },
				year: { x: 52, y: 140, anchor: 'middle' },
				title: { x: 0, y: 160, width: 100, height: 144, align: 'center' },
				styles: {}
			});

			break;

		case 'leftCenterLong':
			Object.assign(out, {
				width: 800,
				height: 240,
				lineStart: { x: 176, y: 5 },
				lineEnd: { x: 325, y: 228 },
				year: { x: 190, y: 80, anchor: 'middle' },
				title: { x: 0, y: 90, width: 225, height: 140, align: 'right' },
				styles: {}
			});

			break;

		case 'rightCenterShort':
			Object.assign(out, {
				width: 800,
				height: 240,
				lineStart: { x: 675, y: 5 },
				lineEnd: { x: 575, y: 228 },
				year: { x: 675, y: 80, anchor: 'middle' },
				title: { x: 650, y: 90, width: 150, height: 150, align: 'left' },
				styles: {}
			});

			break;

		case 'rightCenterLong':
			Object.assign(out, {
				width: 800,
				height: 240,
				lineStart: { x: 624, y: 5 },
				lineEnd: { x: 475, y: 228 },
				year: { x: 610, y: 80, anchor: 'middle' },
				title: { x: 575, y: 90, width: 225, height: 140, align: 'left' },
				styles: {}
			});

			break;

		default:
			throw Error('invalid arrow type');
	}



	const width = out.lineEnd.x - out.lineStart.x;
	const height = out.lineStart.y - out.lineEnd.y;
	const theta = Math.atan(height / width);
	const sign = width >= 0 ? 1 : -1;

	out.styles['box-sizing'] = 'border-box';

	// uses some trig to calc the coordinates of points in the arrow tip depending
	// on the direction of the arrow
	return Object.assign(out, {
		tipPoints: [
			out.lineEnd.x - 28.28 * sign * Math.cos(theta + Math.PI / 4),
			out.lineEnd.y + 28.28 * sign * Math.sin(theta + Math.PI / 4),
			out.lineEnd.x,
			out.lineEnd.y,
			out.lineEnd.x - 28.28 * sign * Math.sin(theta + Math.PI / 4),
			out.lineEnd.y - 28.28 * sign * Math.cos(theta + Math.PI / 4)
		].join(' ')
	});
}

