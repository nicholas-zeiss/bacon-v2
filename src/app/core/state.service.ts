

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { PathingService } from './pathing.service';
import { Actor } from '../shared/actor';
import { BaconPath } from '../shared/bacon-path';


@Injectable()
export class StateService {

	storedBaconPaths: BaconPath[] = [];
	currBaconPath: BaconPath = null;
	currID: string | number = null;
	currChoices: Actor[] = null;
	searchError: number = null;
	private _inputDisabled = false;
	private _inputSubject: Subject<boolean> = new Subject();

	constructor (private pathing: PathingService) { }

	get inputDisabled() {
		return this._inputDisabled;
	}

	displayBaconPath = (path: BaconPath): void => {
		this.currBaconPath = path;
		this.currID = path[0].actor._id;
		this.enableInput();
		this.pathing.pathToDisplay(path[0].actor._id);
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

	handleError = (err: HttpErrorResponse): void  => {
		if (err.status === 300) {
			this.currChoices = err.error;
			this.enableInput();
			this.pathing.pathToChoose(this.currID);
		} else {
			this.searchError = err.status;
			this.enableInput();
			this.pathing.pathToHome();
		}
	}
}

