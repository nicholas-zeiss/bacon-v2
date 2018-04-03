

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


export const copyBaconPath = (path: BaconPath): BaconPath => ({
	nconst: path.nconst,
	nodes: path.nodes.map(({ actor, movie }) => ({
		actor: actor && Object.assign({}, actor),
		movie: movie && Object.assign({}, movie)
	}))
});

