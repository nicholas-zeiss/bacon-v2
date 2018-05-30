/**
 *
 *	This app's state is stored in an rxjs BehaviorSubject which is modified by dispatching actions via another Subject.
 *	The overall flow is similiar to flux/redux etc. Here we initialize the actual store object. The handling of subscribing
 *	to the store and dispatching actions is handled by the StateService and DispatchService of the core module, respectively.
 *
 *
 *	Structure of the store is as follows:
 *		currActorChoice - should the user search an ambiguous name w/ multiple results, here we hold an array of actor models for those results
 *		currBaconPath - when we are displaying an actor's path to bacon it is stored here
 *		homeToggle - an event emitter listened to by the Home component triggered when the user searches for kevin bacon
 *		inputDisabled - whether the search bar is disabled
 *		searchError - should a search result in an error, we store it here and display it in the error compoment
 *		searchName - the name that is currently being searched for
 *		storedActorChoices - stores the actor models found by a previous search for an ambiguous name
 *		storedBaconPaths - stores the paths to bacon found by previous searches
 *		storedNconsts	-	nconsts are the id # of each actor, here we store nconsts previously found indexed by actor name
 *		view - the current app view
 *
**/


import { EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import {
	Actor,
	ActorChoiceStore,
	BaconPath,
	BaconPathStore,
	NconstStore,
	SearchError,
	View
} from './models';


// Defines acceptable actions that can be dispatched to update the state
export type Action = (prev: AppState, next?: AppStateUpdate) => AppState;


export interface AppState {
	currActorChoice: Actor[];
	currBaconPath: BaconPath;
	homeToggle: Subject<boolean>;
	inputDisabled: boolean;
	searchError: SearchError;
	searchName: string;
	storedActorChoices: ActorChoiceStore;
	storedBaconPaths: BaconPathStore;
	storedNconsts: NconstStore;
	view: View;
}


export interface AppStateUpdate {
	currActorChoice?: Actor[];
	currBaconPath?: BaconPath;
	homeToggle?: Subject<boolean>;
	inputDisabled?: boolean;
	searchError?: SearchError;
	searchName?: string;
	storedActorChoices?: ActorChoiceStore;
	storedBaconPaths?: BaconPathStore;
	storedNconsts?: NconstStore;
	view?: View;
}


export interface AppStore {
	actions: Subject<Action>;
	states: BehaviorSubject<AppState>;
}


export const INITIAL_STATE: AppState = {
	currActorChoice: null,
	currBaconPath: null,
	homeToggle: new EventEmitter<boolean>(),
	inputDisabled: false,
	searchError: null,
	searchName: null,
	storedActorChoices: new Map<string, Actor[]>(),
	storedBaconPaths: new Map<number, BaconPath>(),
	storedNconsts: new Map<string, Set<number>>(),
	view: View.Home
};


export const STORE: AppStore = {
	actions: new Subject(),
	states: new BehaviorSubject(INITIAL_STATE)
};

