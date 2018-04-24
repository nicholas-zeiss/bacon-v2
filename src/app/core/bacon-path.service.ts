

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/distinctUntilChanged';

import { DispatchService } from './dispatch.service';
import { ServerCallsService } from './server-calls.service';
import { StateService } from './state.service';

import {
	Actor,
	BaconPath,
	DataStore,
	isBaconPath,
	SearchError
} from '../shared/models';

import { deepEquals, plainString } from '../shared/utils';


@Injectable()
export class BaconPathService {
	private pastData: DataStore;

	constructor(
		private dispatch: DispatchService,
		private serverCalls: ServerCallsService,
		state: StateService
	) {
		state.getStores()
			.distinctUntilChanged(deepEquals)
			.subscribe(stores => this.pastData = stores);
	}


	searchName(origName: string): void {
		const name = plainString(origName);
		const pastNconsts = this.pastData.storedNconsts.get(name);

		if (pastNconsts) {
			if (pastNconsts.size === 1) {
				const nconst = Array.from(pastNconsts)[0];
				const path = this.pastData.storedBaconPaths.get(nconst);
				this.displayBaconPath(path);
			} else {
				const actors = this.pastData.storedActorChoices.get(name);
				this.displayActorChoice(actors);
			}
		} else {
			this.serverCalls
				.searchName(name)
				.subscribe(this.handleSuccess, this.handleError);

			this.dispatch.setSearchName(origName);
			this.dispatch.setViewLoading();
		}
	}


	searchNconst(nconst: number): void {
		const storedPath = this.pastData.storedBaconPaths.get(nconst);

		if (storedPath) {
			this.displayBaconPath(storedPath);
		} else {
			this.serverCalls
				.searchNconst(nconst)
				.subscribe(this.handleSuccess, this.handleError);

			this.dispatch.setSearchName(`index: ${nconst}`);
			this.dispatch.setViewLoading();
		}
	}


	handleSuccess = (res: Actor[] | BaconPath): void => {
		if (isBaconPath(res)) {
			res.forEach(({ actor }) => actor.imgUrl = actor.imgUrl || '/assets/no-image.png');
			this.dispatch.addBaconPathToStore(res);
			this.displayBaconPath(res);
		} else {
			this.dispatch.addActorChoiceToStore(res);
			this.displayActorChoice(res);
		}
	}


	handleError = (err: SearchError): void => {
		this.dispatch.enableInput();
		this.dispatch.setSearchError(err);
		this.dispatch.setViewError();
	}


	displayActorChoice(choice: Actor[]): void {
		this.dispatch.setCurrActorChoice(choice);
		this.dispatch.setViewChoice();
	}


	displayBaconPath(path: BaconPath): void {
		this.dispatch.setCurrBaconPath(path);
		this.dispatch.setViewDisplay();
	}
}

