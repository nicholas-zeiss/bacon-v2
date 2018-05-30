/**
 *
 *	Service that handles manipulating the BaconPath models and manipulation. When a name is to be searched for, this service
 *	is responsible for determining if the search has already been stored or if the server must be queried, handling server responses,
 *	storing new data on a successful server response, and triggering the display of subsequent views.
 *
**/


import { Injectable } from '@angular/core';

import 'rxjs/add/operator/distinctUntilChanged';

import { DispatchService } from './dispatch.service';
import { ServerCallsService } from './server-calls.service';
import { StateService } from './state.service';

import { Actor, BaconPath, BaconPathNode, DataStore, SearchError } from '../shared/models';
import { deepEquals, isBaconPath, plainString } from '../shared/utils';


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
			.subscribe((stores: DataStore): void => {
				this.pastData = stores;
			});
	}


	getStoredActorChoice(name: string): Actor[] {
		name = plainString(name);
		return this.pastData.storedActorChoices.get(name) || null;
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

			this.dispatch.setViewLoading(origName);
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

			this.dispatch.setViewLoading(`index: ${nconst}`);
		}
	}


	handleSuccess = (res: Actor[] | BaconPath): void => {
		if (isBaconPath(res)) {
			res.forEach((node: BaconPathNode): void => {
				node.actor.imgUrl = node.actor.imgUrl || '/assets/no-image.png';
			});

			this.displayBaconPath(res);

		} else {
			this.displayActorChoice(res);
		}

		this.dispatch.addDataToStore(res);
	}


	handleError = (err: SearchError): void => {
		this.dispatch.setSearchError(err);
	}


	displayActorChoice(choice: Actor[]): void {
		this.dispatch.setCurrActorChoice(choice);
	}


	displayBaconPath(path: BaconPath): void {
		this.dispatch.setCurrBaconPath(path);
	}
}

