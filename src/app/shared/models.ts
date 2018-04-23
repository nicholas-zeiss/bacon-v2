

export interface Actor {
	_id: number;
	birthDeath: string;
	imgUrl: string;
	imgInfo: string;
	jobs: string;
	name: string;
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


export type BaconPath = BaconPathNode[];

export interface BaconPathNode {
	actor: Actor;
	movie: Movie;
}

export type BaconPathStore = Map<number, BaconPath>;

export function isBaconPath(path: any): path is BaconPath {
	return path instanceof Array && path.every(node => (
		node.actor
		&& isActor(node.actor)
		&& (node.movie === null || isMovie(node.movie))
	));
}


export type ChoiceStore = Map<string, Actor[]>;


export interface DataStore {
	storedActorChoices: ChoiceStore;
	storedBaconPaths: BaconPathStore;
	storedNconsts: NconstStore;
}


export interface Movie {
	title: string;
	year: number;
}

export function isMovie(movie: any): movie is Movie {
	return (
		movie instanceof Object
		&& typeof movie.title === 'string'
		&& typeof movie.year === 'number'
	);
}


export type NconstStore = Map<string, Set<number>>;


export class SearchError {
	message: string;
	url?: string;

	constructor(name: string, errCode: number) {
		if (errCode === 404) {
			this.message = `${name} is not withing six degrees of Kevin Bacon`;
			this.url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${name.replace(/\s/g, '+')}&s=nm`;
		} else {
			this.message = `Internal Server Error: ${errCode}`;
		}
	}
}


export enum View {
	Choice,
	Display,
	Error,
	Home,
	Loading
}





