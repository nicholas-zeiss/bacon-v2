

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { pluck, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/from';


import { AppState } from './app-state';


export interface Getter {
	name: string;
	subscribe: (state: Subject<AppState>) => () => (
		Subject<AppState>
	);
}


const getChoice: Getter = {
	name: 'getChoice',
	subscribe: (state: Subject<AppState>) => () => (
		state.first().pluck('choice')
	)
};



const getInputDisabled: Getter = {
	name: 'getInputDisabled',
	subscribe: (state: Subject<AppState>) => () => (
		state.pluck('inputDisabled')
	)
};


const getLoading: Getter = {
	name: 'getLoading',
	subscribe: (state: Subject<AppState>) => () => (
		state.pluck('loading')
	)
};


const getPath: Getter = {
	name: 'getPath',
	subscribe: (state: Subject<AppState>) => () => (
		state.first().pluck('path')
	)
};


const getSearchError: Getter = {
	name: 'getSearchError',
	subscribe: (state: Subject<AppState>) => () => (
		state.pluck('searchError')
	)
};


const getSearchTerm: Getter = {
	name: 'getSearchTerm',
	subscribe: (state: Subject<AppState>) => () => (
		state.first().pluck('searchTerm')
	)
};


const getStoredChoices: Getter = {
	name: 'getStoredChoices',
	subscribe: (state: Subject<AppState>) => () => (
		state
			.first()
			.pipe(
				pluck('storedChoices'),
				switchMap(arr => Observable.from(arr))
			)
	)
};


const getStoredPaths: Getter = {
	name: 'getStoredPaths',
	subscribe: (state: Subject<AppState>) => () => (
		state
			.first()
			.pipe(
				pluck('storedPaths'),
				switchMap(arr => Observable.from(arr))
			)
	)
};


export const Getters = [
	getChoice,
	getInputDisabled,
	getLoading,
	getPath,
	getSearchError,
	getSearchTerm,
	getStoredChoices,
	getStoredPaths
];

