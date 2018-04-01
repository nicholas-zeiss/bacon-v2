

import { Actor } from './actor';
import { Movie } from './movie';


export interface BaconPath {
	[index: number]: {
		actor: Actor;
		movie: Movie;
	};
}

