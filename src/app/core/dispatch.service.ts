

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Action, AppState, AppStateUpdate, STORE } from '../shared/app-state';
import { Actor, BaconPath, DataStore, isBaconPath, SearchError, View } from '../shared/models';
import { copyActorChoice, copyBaconPath, plainString } from '../shared/utils';


@Injectable()
export class DispatchService {
	private actions: Subject<Action> = STORE.actions;

	private sendAction(obj: AppStateUpdate): void {
		this.actions.next((prev: AppState) => Object.assign({}, prev, obj));
	}

	private updateStore(prevStore: DataStore, update: Actor[] | BaconPath): DataStore {
		let name: string;
		let nconsts: number[];

		const nextStore = {
			storedActorChoices: new Map(prevStore.storedActorChoices),
			storedBaconPaths: new Map(prevStore.storedBaconPaths),
			storedNconsts: new Map(prevStore.storedNconsts)
		};

		if (isBaconPath(update)) {
			name = plainString(update[0].actor.name);
			nconsts = [update[0].actor._id];
			nextStore.storedBaconPaths.set(nconsts[0], update);
		} else {
			name = plainString(update[0].name);
			nconsts = update.map(actor => actor._id);
			nextStore.storedActorChoices.set(name, update);
		}

		const prevNconsts = prevStore.storedNconsts.get(name) || new Set<number>();
		nconsts = [...Array.from(prevNconsts), ...nconsts];
		nextStore.storedNconsts.set(name, new Set(nconsts));

		return nextStore;
	}


	addActorChoiceToStore(actors: Actor[]): void {
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, this.updateStore(prev, actors))
		));
	}


	addBaconPathToStore(path: BaconPath): void {
		this.actions.next((prev: AppState) => (
			Object.assign({}, prev, this.updateStore(prev, path))
		));
	}


	disableInput(): void {
		this.sendAction({ inputDisabled: true });
	}


	enableInput(): void {
		this.sendAction({ inputDisabled: false });
	}


	setCurrActorChoice(choice: Actor[]): void {
		this.sendAction({ currActorChoice: choice });
	}


	setCurrBaconPath(path: BaconPath): void {
		this.sendAction({ currBaconPath: path });
	}


	setViewChoice(): void {
		this.sendAction({ view: View.Choice });
	}


	setViewDisplay(): void {
		this.sendAction({ view: View.Display });
	}


	setViewError(): void {
		this.sendAction({ view: View.Error });
	}


	setViewHome(): void {
		this.sendAction({ view: View.Home });
	}


	setViewLoading(): void {
		this.sendAction({ view: View.Loading });
	}


	setSearchError(err: SearchError) {
		this.sendAction({ searchError: err });
	}


	setSearchName(searchName: string): void {
		this.sendAction({ searchName });
	}
}

