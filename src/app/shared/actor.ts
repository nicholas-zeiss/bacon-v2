

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


export const copyActorChoice = (choice: ActorChoice) => ({
	actors: choice.actors.map((actor: Actor) => Object.assign({}, actor)),
	name: choice.name
});
