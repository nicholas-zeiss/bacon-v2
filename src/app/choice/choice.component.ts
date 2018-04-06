

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { BaconPathService } from '../core/bacon-path.service';
import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';
import { Actor } from '../shared/actor';


@Component({
	selector: 'app-choice',
	templateUrl: './choice.component.html',
	styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnDestroy {
	choice: Actor[];
	subscription: Subscription;

	constructor(
		private baconPath: BaconPathService,
		private dispatch: DispatchService,
		private state: StateService
	) {
		this.subscription = state
			.getCurrActorChoice()
			.subscribe((choice: Actor[]) => this.choice = choice);
	}


	reset() {
		this.dispatch.enableInput();
		this.dispatch.setCurrActorChoice(null);
		this.dispatch.setViewHome();
	}


	chooseActor(actor: Actor) {
		this.dispatch.setCurrActorChoice(null);
		this.baconPath.searchNconst(actor._id);
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

