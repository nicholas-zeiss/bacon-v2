

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Action, AppState, AppStateUpdate, STORE } from '../shared/app-state';
import { Actor, BaconPath, DataStore, SearchError, View } from '../shared/models';
import { copyModel, isBaconPath, plainString } from '../shared/utils';


@Injectable()
export class DispatchService {
	private actions: Subject<Action> = STORE.actions;

	private sendAction(obj: AppStateUpdate): void {
		this.actions.next((prev: AppState) => Object.assign({}, prev, obj));
	}


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
		this.sendAction({ currActorChoice: copyModel(choice) });
	}


	setCurrBaconPath(path: BaconPath): void {
		this.sendAction({ currBaconPath: copyModel(path) });
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
		this.sendAction({ searchError: copyModel(err) });
	}


	setSearchName(searchName: string): void {
		this.sendAction({ searchName });
	}
}

