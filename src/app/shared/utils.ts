

import { Actor, BaconPath, Movie, SearchError } from './models';


// converts names into a consistent format for usage as a storage key
export const plainString = (str: string): string => (
	str.trim().toLowerCase().replace(/\s+/, ' ')
);




/*
 *	MODELS - helpers for working with the app models defined in ./models
 *		copyModel - a function that will create a full copy of any model instance
 *		isBlank - asserts an obj is an instance of the model Blank
 *		wrapSearchError - convert actor name/nconst and HTTP code into error model
 *
**/

export function copyModel(obj: any): any {
	let copy = obj;

	if (obj instanceof Array) {
		copy = obj.map(x => copyModel(x));
	} else if (obj instanceof Object) {
		copy = {};
		Object.entries(obj).forEach(([k, v]) => copy[k] = copyModel(v));
	}

	return copy;
}

export function isActor(actor: any): actor is Actor {
	return (
		actor instanceof Object
		&& typeof actor._id === 'number'
		&& typeof actor.birthDeath === 'string'
		&& (actor.imgUrl === null || typeof actor.imgUrl === 'string')
		&& (actor.imgInfo === null || typeof actor.imgInfo === 'string')
		&& typeof actor.jobs === 'string'
		&& typeof actor.name === 'string'
	);
}

export function isActorChoice(actors: any): actors is Actor[] {
	return actors instanceof Array && actors.every(actor => isActor(actor));
}

export function isBaconPath(path: any): path is BaconPath {
	return path instanceof Array && path.every(node => (
		node.actor
		&& isActor(node.actor)
		&& (node.movie === null || isMovie(node.movie))
	));
}

export function isMovie(movie: any): movie is Movie {
	return (
		movie instanceof Object
		&& typeof movie.title === 'string'
		&& typeof movie.year === 'number'
	);
}

export function wrapSearchError(name: string, errCode: number): SearchError {
	if (errCode === 404) {
		return {
			message: `${name} is not withing six degrees of Kevin Bacon`,
			url: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${name.replace(/\s/g, '+')}&s=nm`
		};
	} else {
		return { message: `Internal Server Error: ${errCode}` };
	}
}




/*
 *	STATE - exports a function, deepEquals, that determintes
 *		a deep equality comparison of two instances of our app's state
**/

type MapSet = Map<any, any> | Set<any>;

function arrayEquals(a: Array<any>, b: Array<any>): boolean {
	if (a.length !== b.length) {
		return false;
	}

	return a.every((v, i) => deepEquals(v, b[i]));
}

function mapSetEquals(a: MapSet, b: MapSet): boolean {
	if (a.size !== b.size) {
		return false;
	}

	let equal = true;

	(a as Map<any, any>).forEach((v, k) => {
		if (a instanceof Map) {
			equal = equal && deepEquals(v, (b as Map<any, any>).get(k));
		} else {
			equal = equal && b.has(k);
		}
	});

	return true;
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
	if (a === b) {
		return true;
	}

	if (a === null || a === undefined || b === null || b === undefined) {
		return a === b;
	}

	if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
		return false;
	}

	if (a instanceof Map || a instanceof Set) {
		return mapSetEquals(a, b);
	} else if (a instanceof Array) {
		return arrayEquals(a, b);
	} else if (a instanceof Object) {
		return objectEquals(a, b);
	}

	return a === b;
}

