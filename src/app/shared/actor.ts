

export interface Actor {
	_id: number;
	birthDeath: string;
	imgUrl: string;
	imgInfo: string;
	jobs: string;
	name: string;
}


export type ChoiceStore = Map<string, Actor[]>;


export type NconstStore = Map<string, Set<number>>;

