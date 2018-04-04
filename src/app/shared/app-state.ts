

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ActorChoice, ActorID } from './actor';
import { BaconPath } from './bacon-path';
import { SearchError } from './search-error';


export interface AppState {
	choice: ActorChoice;
	inputDisabled: boolean;
	loading: boolean;
	path: BaconPath;
	searchError: SearchError;
	searchTerm: ActorID;
	storedChoices: ActorChoice[];
	storedPaths: BaconPath[];
}


export interface AppStateUpdate {
	choice?: ActorChoice;
	inputDisabled?: boolean;
	loading?: boolean;
	path?: BaconPath;
	searchError?: SearchError;
	searchTerm?: ActorID;
	storedChoices?: ActorChoice[];
	storedPaths?: BaconPath[];
}


export type AppStateProperty = boolean | number | string | ActorChoice | ActorChoice[] | BaconPath | BaconPath[] | SearchError;


export const INITIAL_STATE = {
	choice: null,
	inputDisabled: false,
	loading: false,
	path: null,
	searchError: null,
	searchTerm: null,
	storedChoices: [],
	storedPaths: []
};


export type Action = (prev: AppState, next?: AppStateUpdate) => AppState;


export interface AppStore {
	actions: Subject<Action>;
	states: BehaviorSubject<AppState>;
}


export const STORE: AppStore = {
	actions: new Subject(),
	states: new BehaviorSubject(INITIAL_STATE)
};

