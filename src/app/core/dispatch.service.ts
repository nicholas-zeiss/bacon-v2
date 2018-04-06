

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Actor, ChoiceStore, NconstStore } from '../shared/actor';
import { Action, AppState, AppStore, AppStateUpdate, STORE } from '../shared/app-state';
import { BaconPath, BaconPathStore } from '../shared/bacon-path';
import { SearchError } from '../shared/search-error';
import { View } from '../shared/view';


@Injectable()
export class DispatchService {
	private actions: Subject<Action> = STORE.actions;

	private sendAction(obj: AppStateUpdate) {
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, obj)
		));
	}


	addActorChoiceToStore(actors: Actor[]) {
		this.actions.next((prev: AppState) => {
			const name = actors[0].name.toLowerCase();
			const nconsts = actors.map(a => a._id);
			const next = {
				storedActors: new Map(prev.storedActors),
				storedActorChoices: new Map(prev.storedActorChoices)
			};

			next.storedActors.set(name, new Set(nconsts));
			next.storedActorChoices.set(name, actors);

			return Object.assign({}, prev, next);
		});
	}


	addBaconPathToStore(path: BaconPath) {
		this.actions.next((prev: AppState) => {
			const name = path[0].actor.name.toLowerCase();
			const nconst = path[0].actor._id;

			const next = {
				storedActors: new Map(prev.storedActors),
				storedBaconPaths: new Map(prev.storedBaconPaths)
			};

			next.storedActors.set(name, new Set([nconst]));
			next.storedBaconPaths.set(nconst, path);

			return Object.assign({}, prev, next);
		});
	}


	setViewChoice() {
		this.sendAction({ view: View.Choice });
	}


	setViewDisplay() {
		this.sendAction({ view: View.Display });
	}


	setViewHome() {
		this.sendAction({ view: View.Home });
	}


	setViewLoading() {
		this.sendAction({ view: View.Loading });
	}


	setViewError() {
		this.sendAction({ view: View.Error });
	}


	disableInput() {
		this.sendAction({ inputDisabled: true });
	}


	enableInput() {
		this.sendAction({ inputDisabled: false });
	}


	setSearchError(err: SearchError) {
		this.sendAction({ searchError: err });
	}


	setSearchName(searchName: string) {
		this.sendAction({ searchName });
	}


	setCurrActorChoice(choice: Actor[]) {
		this.sendAction({ currActorChoice: choice });
	}


	setCurrBaconPath(path: BaconPath) {
		this.sendAction({ currBaconPath: path });
	}


	// displayChoice = (choice: ActorChoice) => {
	// 	const update = {
	// 		inputDisabled: true,
	// 		loading: false,
	// 		searchError: null,
	// 		searchTerm: null
	// 	};

	// 	this.actions.next((prev: AppState) => Object.assign({}, prev, update, { choice }));
	// }


	// displayPath = (path: BaconPath) => {
	// 	const update = {
	// 		inputDisabled: true,
	// 		loading: false,
	// 		searchError: null,
	// 		searchTerm: null
	// 	};

	// 	this.actions.next((prev: AppState) => Object.assign({}, prev, update, { path }));
	// }


	// storeChoice = (choice: ActorChoice) => {
	// 	this.actions.next((prev: AppState) => (
	// 		Object.assign({}, prev, { storedChoices: [...prev.storedChoices, choice] })
	// 	));
	// }


	// storePath = (path: BaconPath) => {
	// 	this.actions.next((prev: AppState) => (
	// 		Object.assign({}, prev, { storedPaths: [...prev.storedPaths, path] })
	// 	));
	// }


	// reset = () => {
	// 	const update = {
	// 		inputDisabled: false,
	// 		loading: false,
	// 		searchError: null,
	// 		searchTerm: null
	// 	};

	// 	this.actions.next((prev: AppState) => Object.assign({}, prev, update));
	// }
}

