

import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';

import {
	Actor,
	BaconPath,
	DataStore,
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
			.scan(
				(state: AppState, action: Action) => action(state),
				INITIAL_STATE
			)
			.distinctUntilChanged(deepEquals)
			.subscribe(state => this.store.states.next(state));
	}


	getCurrActorChoice = (): Observable<Actor[]> => (
		this.store.states.pluck('currActorChoice')
	)


	getCurrBaconPath = (): Observable<BaconPath> => (
		this.store.states.pluck('currBaconPath')
	)


	getInputDisabled = (): Observable<boolean> => (
		this.store.states.pluck('inputDisabled')
	)


	getHomeToggle = (): Observable<EventEmitter<boolean>> => (
		this.store.states.pluck('homeToggle')
	)


	getSearchError = (): Observable<SearchError> => (
		this.store.states.pluck('searchError')
	)


	getSearchName = (): Observable<string> => (
		this.store.states.pluck('searchName')
	)


	getStores = (): Observable<DataStore> => (
		this.store.states.map((state: AppState) => ({
			storedActorChoices: state.storedActorChoices,
			storedBaconPaths: state.storedBaconPaths,
			storedNconsts: state.storedNconsts
		}))
	)


	getView = (): Observable<View> => (
		this.store.states.pluck('view')
	)
}

