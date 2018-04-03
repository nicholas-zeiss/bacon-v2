

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';
import { ActorChoice, copyActorChoice } from '../shared/actor';
import { BaconPath, BaconPathNode, copyBaconPath } from '../shared/bacon-path';


const INIT_STATE = {
	choice: { init: null, copy: copyActorChoice },
	inputDisabled: { init: false },
	loading: { init: false },
	path: { init: null, copy: copyBaconPath },
	searchError: { init: null },
	searchTerm: { init: null }
};

const addProperty = (obj, key, { init, copy = a => a }) => {
	const subj = new BehaviorSubject(init);

	Object.defineProperty(obj, key, {
		get() { return subj; },
		set(val) { subj.next(copy(val)); }
	});
};


@Injectable()
export class StateService {
	private storedChoices: { [index: string]: BaconPath } = {};
	private storedPaths: { [index: string]: BaconPath } = {};

	constructor (
		private pathing: PathingService,
		private server: ServerCallsService
	) {
		for (const key in INIT_STATE) {
			addProperty(this, key, INIT_STATE[key]);
		}
	}

	loadStored(term: string | number): boolean {
		if (this.storedChoices[term] || this.storedPaths[term]) {
			if (typeof term === 'string') {
				this.choice = this.storedChoices[term];
			} else {
				this.path = this.storedPaths[term];
			}

			return true;
		}

		return false;
	}

	search(term: number | string): void {
		this.searchError = null;
		this.searchTerm = term;
		this.inputDisabled = true;
		this.loading = true;

		this.server
			.getPath(term)
			.subscribe(this.handleSuccess, this.handleError);
	}


	handleSuccess = (path: BaconPath): void => {
		this.inputDisabled = false;
		this.loading = false;
		this.path = path;
		this.searchTerm = null;
		this.storedPaths[path.nconst] = path;

		this.pathing.pathToDisplay(path.nconst);
	}


	handleError = (err: HttpErrorResponse): void => {
		this.loading = false;

		if (err.status === 300) {
			const choice = { actors: err.error, name: err.error[0].name };

			this.choice = choice;
			this.storedChoices[choice.name] = choice;
			this.pathing.pathToChoose(choice.name);

		} else {
			this.inputDisabled = false;
			this.searchError = err.status;
			this.pathing.pathToHome();
		}
	}
}

