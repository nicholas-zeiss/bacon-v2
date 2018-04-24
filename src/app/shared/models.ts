

export interface Actor {
	_id: number;
	birthDeath: string;
	imgUrl: string;
	imgInfo: string;
	jobs: string;
	name: string;
}


export type ActorChoiceStore = Map<string, Actor[]>;


export type BaconPath = BaconPathNode[];


export interface BaconPathNode {
	actor: Actor;
	movie: Movie;
}


export type BaconPathStore = Map<number, BaconPath>;


export interface DataStore {
	storedActorChoices: ActorChoiceStore;
	storedBaconPaths: BaconPathStore;
	storedNconsts: NconstStore;
}


export interface Movie {
	title: string;
	year: number;
}


export type NconstStore = Map<string, Set<number>>;


export interface SearchError {
	message: string;
	url?: string;
}


export enum View {
	Choice,
	Display,
	Error,
	Home,
	Loading
}





