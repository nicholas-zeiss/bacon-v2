

import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
	Actor,
	ActorChoiceStore,
	BaconPath,
	BaconPathStore,
	NconstStore,
	SearchError,
	View
} from './models';


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

