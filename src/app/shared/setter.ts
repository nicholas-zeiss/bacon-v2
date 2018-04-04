

import { Subject } from 'rxjs/Subject';

import { ActorChoice, ActorID } from './actor';
import { BaconPath, isBaconPath } from './bacon-path';
import { Action, AppState, AppStore, AppStateUpdate, STORE } from './app-state';
import { isSearchError, SearchError } from './search-error';


export function Setter<T extends { new(...args: any[]): {} }>(constructor: T) {
	return class extends constructor {

		private actions: Subject<Action> = STORE.actions;

		startLoading = (term: ActorID) => {
			const update = {
				inputDisabled: true,
				loading: true,
				searchError: null,
			};

			this.actions.next((prev: AppState) => Object.assign({}, prev, update, { searchTerm: term }));
		}


		stopLoading = (res: ActorChoice | BaconPath | SearchError) => {
			const update = {
				loading: false,
				searchError: null,
				searchTerm: null
			};

			let result: AppStateUpdate;

			if (isSearchError(res)) {
				result = { searchError: res };
			} else if (isBaconPath(res)) {
				result = { path: res };
			} else {
				result = { choice: res };
			}

			result.inputDisabled = !result.searchError;

			this.actions.next((prev: AppState) => Object.assign({}, prev, update, result));
		}


		displayChoice = (choice: ActorChoice) => {
			const update = {
				inputDisabled: true,
				loading: false,
				searchError: null,
				searchTerm: null
			};

			this.actions.next((prev: AppState) => Object.assign({}, prev, update, { choice }));
		}


		displayPath = (path: BaconPath) => {
			const update = {
				inputDisabled: true,
				loading: false,
				searchError: null,
				searchTerm: null
			};

			this.actions.next((prev: AppState) => Object.assign({}, prev, update, { path }));
		}


		storeChoice = (choice: ActorChoice) => {
			this.actions.next((prev: AppState) => (
				Object.assign({}, prev, { storedChoices: [...prev.storedChoices, choice] })
			));
		}


		storePath = (path: BaconPath) => {
			this.actions.next((prev: AppState) => (
				Object.assign({}, prev, { storedPaths: [...prev.storedPaths, path] })
			));
		}


		reset = () => {
			const update = {
				inputDisabled: false,
				loading: false,
				searchError: null,
				searchTerm: null
			};

			this.actions.next((prev: AppState) => Object.assign({}, prev, update));
		}
	};
}

