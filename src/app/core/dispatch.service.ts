/**
 *
 *	This service handles manipulation of the state by dispatching actions the store, which are processed in StateService.
 *
**/


import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Action, AppState, AppStateUpdate, STORE } from '../shared/app-state';
import { Actor, BaconPath, SearchError, View } from '../shared/models';
import { copyModel, isBaconPath, plainString } from '../shared/utils';


const DEFAULT_STATE = {
	currActorChoice: null,
	currBaconPath: null,
	inputDisabled: false,
	searchError: null,
	searchName: null
};

// helper function for dispatches that set the state to mostly default values.
const expandDefault = (update: AppStateUpdate): AppStateUpdate => (
	Object.assign({}, DEFAULT_STATE, update)
);


@Injectable()
export class DispatchService {
	private actions: Subject<Action> = STORE.actions;
	private sendAction(obj: AppStateUpdate): void {
		this.actions.next((prev: AppState) => Object.assign({}, prev, obj));
	}


	// When a search for an actor not already found is successful, we store the resulting data here.
	// This data can either be a choice of actors matching the searched name, or a bacon path.
	// For both, the nconst id # of the actor(s) is stored with their names.
	addDataToStore(data: Actor[] | BaconPath): void {
		data = copyModel(data);

		this.actions.next((prev: AppState) => {
			let name: string;
			let nconsts: number[];

			const next = {
				storedActorChoices: new Map(prev.storedActorChoices),
				storedBaconPaths: new Map(prev.storedBaconPaths),
				storedNconsts: new Map(prev.storedNconsts)
			};

			if (isBaconPath(data)) {
				name = plainString(data[0].actor.name);
				nconsts = [data[0].actor._id];
				next.storedBaconPaths.set(nconsts[0], data);
			} else {
				name = plainString(data[0].name);
				nconsts = data.map(actor => actor._id);
				next.storedActorChoices.set(name, data);
			}

			const prevNconsts = prev.storedNconsts.get(name) || new Set<number>();
			nconsts = [...Array.from(prevNconsts), ...nconsts];
			next.storedNconsts.set(name, new Set(nconsts));

			return Object.assign({}, prev, next);
		});
	}


	disableInput(): void {
		this.sendAction({ inputDisabled: true });
	}


	enableInput(): void {
		this.sendAction({ inputDisabled: false });
	}


	setCurrActorChoice(choice: Actor[]): void {
		this.sendAction(expandDefault({
			currActorChoice: copyModel(choice),
			inputDisabled: true,
			view: View.Choice
		}));
	}


	setCurrBaconPath(path: BaconPath): void {
		this.sendAction(expandDefault({
			currBaconPath: copyModel(path),
			inputDisabled: true,
			view: View.Display
		}));
	}


	setSearchError(err: SearchError): void {
		this.sendAction(expandDefault({
			searchError: copyModel(err),
			view: View.Error
		}));
	}


	setViewHome(): void {
		this.sendAction(expandDefault({ view: View.Home }));
	}


	setViewLoading(name: string): void {
		this.sendAction({
			inputDisabled: true,
			searchName: name,
			view: View.Loading
		});
	}
}

