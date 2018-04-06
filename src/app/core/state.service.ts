

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';

import { Actor, ChoiceStore, NconstStore } from '../shared/actor';
import { Action, AppState, AppStore, INITIAL_STATE, STORE } from '../shared/app-state';
import { BaconPath, BaconPathStore } from '../shared/bacon-path';
import { SearchError } from '../shared/search-error';
import { View } from '../shared/view';


const shallowEquals = (a, b) => {
	for (const key in a) {
		if (a[key] !== b[key]) {
			return false;
		}
	}

	return true;
};


@Injectable()
export class StateService {
	private store: AppStore = STORE;

	constructor() {
		this.store.actions
			.scan((state: AppState, action: Action) => action(state), INITIAL_STATE)
			.distinctUntilChanged(shallowEquals)
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

