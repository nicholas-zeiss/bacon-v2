

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';
import { Actor } from '../shared/actor';
import { BaconPath } from '../shared/bacon-path';


@Injectable()
export class StateService {
	currPath: BaconPath = null;
	currID: string | number = null;
	currChoices: Actor[] = null;
	searchError: number = null;
	storedPaths: { [index: string]: BaconPath } = {};
	private _inputDisabled = false;
	private _inputSubject: Subject<boolean> = new Subject();

	constructor (
		private pathing: PathingService,
		private serverCalls: ServerCallsService
	) { }


	get inputDisabled() {
		return this._inputDisabled;
	}


	listenToInput(observer: Observer<boolean>): Subscription {
		return this._inputSubject.subscribe(observer);
	}


	disableInput = (): void => {
		if (!this._inputDisabled) {
			this._inputDisabled = true;
			this._inputSubject.next(true);
		}
	}


	enableInput = (): void => {
		if (this._inputDisabled) {
			this._inputDisabled = false;
			this._inputSubject.next(false);
		}
	}


	search(term: number | string): void {
		this.currID = term;
		this.searchError = null;
		this.disableInput();
		this.pathing.pathToLoading();

		let call;

		if (typeof term === 'number') {
			call = this.serverCalls.getPathByNconst(term);
		} else {
			call = this.serverCalls.getPathByName(term);
		}

		call.subscribe(this.handleSuccess, this.handleError);
	}


	handleSuccess = (path: BaconPath): void => {
		const nconst = path[0].actor._id;

		this.storedPaths[nconst] = path;
		this.currID = nconst;
		this.displayBaconPath();
	}


	handleError = (err: HttpErrorResponse): void => {
		if (err.status === 300) {
			this.currChoices = err.error;
			this.pathing.pathToChoose(err.error[0].name);
		} else {
			this.searchError = err.status;
			this.enableInput();
			this.pathing.pathToHome();
		}
	}


	displayBaconPath = (): void => {
		this.currPath = this.storedPaths[this.currID];
		this.pathing.pathToDisplay(<number>this.currID);
	}
}

