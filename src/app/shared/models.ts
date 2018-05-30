/**
 *
 *	Holds our TS types/interfaces/enums etc for various data models
 *
**/


export interface Actor {
	_id: number;
	birthDeath: string;		// their 'birth year - death year', or '' if no data
	imgUrl: string;				// url for a generated image of them from wikimedia
	imgInfo: string;			// url for that image's page
	jobs: string;					// main three professions according to IMDB
	name: string;
}


export type ActorChoiceStore = Map<string, Actor[]>;


// The path from an actor to Bacon is represented as an array of objects holding an actor and the
// movie linking them to the next person in the path. The last item always holds Kevin Bacon w/ a movie value of null.
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


// when a user search finds no results, we generate a url searching IMDB for the same name,
// so that the user can ensure they are searching for the name used by IMDB. EG, searching 'charlie chaplin'
// on the app will find no results, but when the user goes to the provided url they will see they should
// instead search 'charles chaplin'
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

