

import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, pluck, scan, switchMap } from 'rxjs/operators';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/from';

import { Action, AppState, AppStore, INITIAL_STATE, STORE } from './app-state';


const shallowEquals = (a, b) => {
	for (const key in a) {
		if (a[key] !== b[key]) {
			return false;
		}
	}

	return true;
};


export function Getter<T extends {new (...args: any[]): {} }> (constructor: T) {
	return class extends constructor {
		private store: AppStore = STORE;

		constructor(...args: any[]) {
			this.store.actions
				.pipe(
					scan((state, action) => action(state), INITIAL_STATE),
					distinctUntilChanged(shallowEquals)
				)
				.subscribe(state => this.store.states.next(state));
		}

		getChoice = () => this.store.states.first().pluck('choice');

		getInputDisabled = () => this.store.states.pluck('inputDisabled');

		getLoading = () => this.store.states.pluck('loading');

		getPath = () => this.store.states.first().pluck('path');

		getSearchError = () => this.store.states.pluck('searchError');

		getSearchTerm = () => this.store.states.pluck('searchTerm');

		getStoredChoices = () => this.store.states.first().pipe(
			pluck('storedChoices'),
			switchMap((arr: any[]) => Observable.from(arr))
		)

		getStoredPaths = () => this.store.states.first().pipe(
			pluck('storedPaths'),
			switchMap((arr: any[]) => Observable.from(arr))
		)
	};
}

