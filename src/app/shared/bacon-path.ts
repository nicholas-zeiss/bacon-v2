

import { Actor } from './actor';
import { AppStateProperty } from './app-state';
import { Movie } from './movie';


export interface BaconPathNode {
	actor: Actor;
	movie: Movie;
}


export interface BaconPath {
	nconst: number;
	nodes: BaconPathNode[];
}


export function isBaconPath(obj: AppStateProperty): obj is BaconPath {
	return typeof (<BaconPath>obj).nconst === 'number';
}

