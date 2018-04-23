

import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Actor, ChoiceStore, NconstStore } from './actor';
import { BaconPath, BaconPathStore } from './bacon-path';
import { SearchError } from './search-error';
import { View } from './view';


export interface AppState {
	currActorChoice: Actor[];
	inputDisabled: boolean;
	currBaconPath: BaconPath;
	homeToggle: Subject<boolean>;
	searchError: SearchError;
	searchName: string;
	storedActors: NconstStore;
	storedBaconPaths: BaconPathStore;
	storedActorChoices: ChoiceStore;
	view: View;
}


export interface AppStateUpdate {
	currActorChoice?: Actor[];
	inputDisabled?: boolean;
	currBaconPath?: BaconPath;
	homeToggle?: Subject<boolean>;
	searchError?: SearchError;
	searchName?: string;
	storedActors?: NconstStore;
	storedBaconPaths?: BaconPathStore;
	storedActorChoices?: ChoiceStore;
	view?: View;
}


export const INITIAL_STATE = {
	currActorChoice: null,
	inputDisabled: false,
	currBaconPath: null,
	homeToggle: new EventEmitter<boolean>(),
	searchError: null,
	searchName: null,
	storedActors: new Map<string, Set<number>>(),
	storedBaconPaths: new Map<number, BaconPath>(),
	storedActorChoices: new Map<string, Actor[]>(),
	view: View.Home
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

