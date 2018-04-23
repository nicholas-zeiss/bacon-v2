

import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';

import {
	Actor,
	ChoiceStore,
	NconstStore,
	BaconPath,
	BaconPathStore,
	SearchError,
	View
} from '../shared/models';

import { Action, AppState, AppStore, INITIAL_STATE, STORE } from '../shared/app-state';
import { deepEquals } from '../shared/utils';


@Injectable()
export class StateService {
	private store: AppStore = STORE;

	constructor() {
		this.store.actions
			.scan((state: AppState, action: Action) => (
				action(state)
			), INITIAL_STATE)
			.distinctUntilChanged(deepEquals)
			.subscribe(state => this.store.states.next(state));
	}


	getCurrActorChoice = (): Observable<Actor[]> => (
		this.store.states.pluck('currActorChoice')
	)


	getCurrBaconPath = (): Observable<BaconPath> => (
		this.store.states.pluck('currBaconPath')
	)


	getHomeToggle = (): Observable<EventEmitter<boolean>> => (
		this.store.states.pluck('homeToggle')
	)

	getInputDisabled = (): Observable<boolean> => (
		this.store.states.pluck('inputDisabled')
	)


	getSearchError = (): Observable<SearchError> => (
		this.store.states.pluck('searchError')
	)


	getSearchName = (): Observable<string> => (
		this.store.states.pluck('searchName')
	)


	getStores = () => (
		this.store.states.map((state: AppState) => ({
			storedActors: state.storedActors,
			storedBaconPaths: state.storedBaconPaths,
			storedChoices: state.storedActorChoices
		}))
	)


	getView = (): Observable<View> => (
		this.store.states.pluck('view')
	)
}

