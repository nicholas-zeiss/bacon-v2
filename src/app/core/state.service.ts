/**
 *
 *	This service allows other components/services/etc to access the app state by returning observables of the requested part of the state.
 *	It also sets up the processing of dispatched actions in the constructor.
 *
**/


import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';

import { Action, AppState, AppStore, INITIAL_STATE, STORE } from '../shared/app-state';
import { Actor, BaconPath, DataStore, SearchError, View } from '../shared/models';
import { copyModel, deepEquals } from '../shared/utils';


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
			.subscribe((state: AppState): void => {
				this.store.states.next(state);
			});
	}


	// Helper function for subscribing to state properties corresponding to objects.
	// Returns an observable that only emits when that property is changed; changes to a different
	// object with the same structure are not emitted (ie change must be deep). The returned observable
	// emits copies of the object stored in the state.
	pluckObject = <T>(propName: string): Observable<T> => (
		this.store.states
			.pluck(propName)
			.distinctUntilChanged(deepEquals)
			.map(copyModel)
	)


	// Helper function for subscribing to state properties with primitive values. Only emits when that property
	// is changed, and not changes to any other state properties.
	pluckPrimitive = <T>(propName: string): Observable<T> => (
		this.store.states
			.pluck<AppState, T>(propName)
			.distinctUntilChanged()
	)


	getCurrActorChoice = (): Observable<Actor[]> => (
		this.pluckObject<Actor[]>('currActorChoice')
	)


	getCurrBaconPath = (): Observable<BaconPath> => (
		this.pluckObject<BaconPath>('currBaconPath')
	)


	getInputDisabled = (): Observable<boolean> => (
		this.pluckPrimitive<boolean>('inputDisabled')
	)


	// The home toggle event emitter is never changed.
	getHomeToggle = (): Observable<EventEmitter<boolean>> => (
		this.store.states
			.pluck<AppState, EventEmitter<boolean>>('homeToggle')
			.first()
	)


	getSearchError = (): Observable<SearchError> => (
		this.pluckObject<SearchError>('searchError')
	)


	getSearchName = (): Observable<string> => (
		this.pluckPrimitive<string>('searchName')
	)


	getStores = (): Observable<DataStore> => (
		this.store.states.map((state: AppState): DataStore => ({
			storedActorChoices: state.storedActorChoices,
			storedBaconPaths: state.storedBaconPaths,
			storedNconsts: state.storedNconsts
		}))
	)


	getView = (): Observable<View> => (
		this.pluckPrimitive<View>('view')
	)
}

