

import { EventEmitter } from '@angular/core';


type MapSet = Map<any, any> | Set<any>;


function mapSetEquals(a: MapSet, b: MapSet): boolean {
	if (a.size !== b.size) {
		return false;
	}

	let equal = true;

	(<Map<any, any>>a).forEach((v, k) => {
		if (a instanceof Map) {
			equal = equal && deepEquals(v, (b as Map<any, any>).get(k));
		} else {
			equal = equal && b.has(k);
		}
	});

	return true;
}


function arrayEquals(a: Array<any>, b: Array<any>): boolean {
	if (a.length !== b.length) {
		return false;
	}

	return a.every((v, i) => deepEquals(v, b[i]));
}


function objectEquals(a: Object, b: Object): boolean {
	if (Object.keys(a).length !== Object.keys(b).length) {
		return false;
	}

	for (const k in a) {
		if (!deepEquals(a[k], b[k])) {
			return false;
		}
	}

	return true;
}


export function deepEquals(a, b): boolean {
	try {
		if (a === null || a === undefined || b === null || b === undefined) {
			return a === b;
		}

		if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
			return false;
		}

		if (a instanceof EventEmitter || b instanceof EventEmitter) {
			return a === b;
		}

		if (a instanceof HTMLElement || b instanceof HTMLElement) {
			return a === b;
		}

		if (a instanceof Map || a instanceof Set) {
			return mapSetEquals(a, b);

		} else if (a instanceof Array) {
			return arrayEquals(a, b);

		} else if (a instanceof Object) {
			return objectEquals(a, b);
		}

		return a === b;

	} catch (err) {
		console.log(a, b);
		console.log(err);
		throw err;
	}
}

