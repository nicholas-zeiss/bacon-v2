

import { Actor } from './actor';
import { Movie } from './movie';


export interface BaconPathNode {
	actor: Actor;
	movie: Movie;
}


export interface BaconPath {
	nconst: number;
	nodes: BaconPathNode[];
}

