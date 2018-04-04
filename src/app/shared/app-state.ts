

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


export const INITIAL_STATE = {
	choice: null,
	// choice: {name: 'Tom Holland'},
	inputDisabled: false,
	loading: false,
	path: null,
	searchError: null,
	searchTerm: null,
	storedChoices: [],
	// storedChoices: [{name: 'Tom Holland'}],
	// storedChoices: [{name:'Tom Holland'},{name:'foo3'},{name:'foo1'},{name:'foo2'}],
	storedPaths: []
};

