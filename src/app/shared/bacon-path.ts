

import { Actor } from './actor';
import { Movie } from './movie';


export interface BaconPathNode {
	actor: Actor;
	movie: Movie;
}


export type BaconPath = BaconPathNode[];


export type BaconPathStore = Map<number, BaconPath>;


export function isBaconPath(obj): obj is BaconPath {
	return (<BaconPath>obj)[0].movie !== undefined;
}

