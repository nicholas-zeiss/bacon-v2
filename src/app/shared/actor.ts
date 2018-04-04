

export interface Actor {
	_id: number;
	birthDeath: string;
	imgUrl: string;
	imgInfo: string;
	jobs: string;
	name: string;
}


export interface ActorChoice {
	name: string;
	actors: Actor[];
}


export type ActorID = number | string;

