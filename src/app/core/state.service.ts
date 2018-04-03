

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';
import { ActorChoice, copyActorChoice, isActorChoice } from '../shared/actor';
import { BaconPath, copyBaconPath } from '../shared/bacon-path';
import { SearchError } from '../shared/search-error';


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
	private storedChoices: { [index: string]: ActorChoice } = {};
	private storedPaths: { [index: number]: BaconPath } = {};
	choice: BehaviorSubject<ActorChoice>;
	inputDisabled: BehaviorSubject<boolean>;
	loading: BehaviorSubject<boolean>;
	path: BehaviorSubject<BaconPath>;
	searchError: BehaviorSubject<SearchError>;
	searchTerm: BehaviorSubject<number | string>;

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

	search(term: number | string) {
		this.searchError = null;
		this.searchTerm = term;
		this.inputDisabled = true;
		this.loading = true;

		this.server
			.getPath(term)
			.subscribe(this.handleSuccess, this.handleError);
	}


	handleSuccess = (payload: ActorChoice | BaconPath) => {
		this.inputDisabled = false;
		this.loading = false;
		this.searchTerm = null;

		if (isActorChoice(payload)) {
			this.choice = payload;
			this.storedChoices[payload.name] = payload;
			this.pathing.pathToChoose(payload.name);
		} else {
			this.path = payload;
			this.storedPaths[payload.nconst] = payload;
			this.pathing.pathToDisplay(payload.nconst);
		}
	}


	handleError = (err: SearchError) => {
		this.inputDisabled = false;
		this.loading = false;
		this.searchError = err;
		this.pathing.pathToHome();
	}


	reset = () => {
		this.inputDisabled = false;
		this.loading = false;
		this.searchError = null;
		this.searchTerm = null;
		this.pathing.pathToHome();
	}
}

