

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/distinctUntilChanged';

import { DispatchService } from './dispatch.service';
import { ServerCallsService } from './server-calls.service';
import { StateService } from './state.service';

import {
	Actor,
	ChoiceStore,
	NconstStore,
	BaconPath,
	BaconPathStore,
	SearchError
} from '../shared/models';

import { deepEquals } from '../shared/utils';


@Injectable()
export class BaconPathService {
	private storedActors: NconstStore;
	private storedBaconPaths: BaconPathStore;
	private storedChoices: ChoiceStore;

	constructor(
		private dispatch: DispatchService,
		private serverCalls: ServerCallsService,
		private state: StateService
	) {
		state.getStores()
			.distinctUntilChanged(deepEquals)
			.subscribe(stores => Object.assign(this, stores));
	}


	searchName(name: string) {
		const origName = name;
		name = name.toLowerCase();

		if (this.storedActors.has(name)) {
			if (this.storedActors.get(name).size === 1) {
				const nconst = Array.from(this.storedActors.get(name))[0];
				const path = this.storedBaconPaths.get(nconst);
				this.displayBaconPath(path);
			} else {
				const actors = this.storedChoices.get(name);
				this.displayActorChoice(actors);
			}

			return;
		}

		this.dispatch.setSearchName(origName);
		this.dispatch.setViewLoading();
		this.serverCalls
			.searchName(name)
			.subscribe(this.handleSuccess, this.handleError);
	}


	searchNconst(nconst: number) {
		if (this.storedBaconPaths.has(nconst)) {
			const path = this.storedBaconPaths.get(nconst);
			this.displayBaconPath(path);
			return;
		}

		this.dispatch.setSearchName(`index: ${nconst}`);
		this.dispatch.setViewLoading();
		this.serverCalls
			.searchNconst(nconst)
			.subscribe(this.handleSuccess, this.handleError);
	}


	handleSuccess = (res: Actor[] | BaconPath) => {
		if ((res as BaconPath)[0].movie !== undefined) {
			res = res as BaconPath;

			res.forEach(({ actor, movie }) => (
				actor.imgUrl = actor.imgUrl || '/assets/no-image.png'
			));

			this.dispatch.addBaconPathToStore(res);
			this.displayBaconPath(res);

		} else {
			res = res as Actor[];

			this.dispatch.addActorChoiceToStore(res);
			this.displayActorChoice(res);
		}
	}


	handleError = (err: SearchError) => {
		this.dispatch.enableInput();
		this.dispatch.setSearchError(err);
		this.dispatch.setViewError();
	}


	displayActorChoice(choice: Actor[]) {
		this.dispatch.setCurrActorChoice(choice);
		this.dispatch.setViewChoice();
	}


	displayBaconPath(path: BaconPath) {
		this.dispatch.setCurrBaconPath(path);
		this.dispatch.setViewDisplay();
	}
}

