

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


export type Nconst = number | string;


export const copyActorChoice = (choice: ActorChoice) => (
	!choice ? null : {
		actors: choice.actors.map((actor: Actor) => Object.assign({}, actor)),
		name: choice.name
	}
);


export const isActorChoice = (choice: any): choice is ActorChoice => (
	typeof choice.name === 'string' &&
	choice.actors instanceof Array &&
	choice.actors.every(actor => typeof actor.name === 'string')
);

