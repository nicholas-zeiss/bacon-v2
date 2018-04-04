

import { Subject } from 'rxjs/Subject';

import { ActorChoice, ActorID } from './actor';
import { BaconPath } from './bacon-path';
import { AppState, AppStateUpdate } from './app-state';
import { SearchError } from './search-error';


export interface Setter {
	actions: Subject<Action>;
	name: string;
	update: AppStateUpdate;
	dispatch: () => void;
}


class StopLoading implements Setter {
	name = 'stopLoading';
	private update = {
		loading: false,
		searchError: null,
		searchTerm: null
	};

	constructor(private actions: Subject<Action>) { }

	dispatch = (res: ActorChoice | BaconPath | SearchError) => {
		const result = !res.message ? res.nconst ? { path: res } : { choice: res } : { searchError: res };
		result.inputDisabled = !result.searchError;

		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, this.update, result)
		));
	})
}


class StartLoading implements Setter {
	name = 'startLoading';
	private update = {
		inputDisabled: true,
		loading: true,
		searchError: null,
	};

	constructor(private actions: Subject<Action>) { }

	dispatch = (term: ActorID) => (
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, this.update, { searchTerm: term })
		))
	)
}


class DisplayChoice implements Setter {
	name = 'displayChoice';
	private update = {
		inputDisabled: true,
		loading: false,
		searchError: null,
		searchTerm: null
	};

	constructor(private actions: Subject<Action>) { }

	dispatch = (choice: ActorChoice) => (
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, this.update, { choice })
		))
	)
}


class DisplayPath implements Setter {
	name = 'displayPath';
	private update = {
		inputDisabled: true,
		loading: false,
		searchError: null,
		searchTerm: null
	};

	constructor(private actions: Subject<Action>) { }

	dispatch = (path: BaconPath) => (
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, this.update, { path })
		))
	)
}


class StoreChoice implements Setter {
	name = 'storeChoice';
	private update = {};

	constructor(private actions: Subject<Action>) { }

	dispatch = (choice: ActorChoice) => (
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, {
				storedChoices: [...prev.storedChoices, choice],
			})
		))
	)
}


class StorePath implements Setter {
	name = 'storePath';
	private update = {};

	constructor(private actions: Subject<Action>) { }

	dispatch = (path: BaconPath) => (
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, {
				storedPaths: [...prev.storedPaths, path],
			})
		))
	)
}


class Reset implements Setter {
	name = 'reset';
	private update = {
		inputDisabled: false,
		loading: false,
		searchError: null,
		searchTerm: null
	};

	constructor(private actions: Subject<Action>) { }

	dispatch = () => (
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, this.update)
		))
	)
}


export const Setters = [
	StopLoading,
	StartLoading,
	DisplayChoice,
	DisplayPath,
	StoreChoice,
	StorePath,
	Reset
];

