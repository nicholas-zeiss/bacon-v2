

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

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
	choiceStr: string[];
	subscription: Subscription;

	constructor(
		private dispatch: DispatchService,
		private state: StateService
	) {
		this.subscription = state
			.getCurrActorChoice()
			.subscribe((choice: Actor[]) => {
				this.choice = choice;
				this.choiceString();
			});
	}


	choiceString() {
		if (!this.choice) {
			this.choiceStr = [];
			return;
		}

		this.choiceStr = this.choice.map((actor: Actor) => (
			actor.name + ' ' + actor.birthDeath
		));
	}


	reset() {
		this.dispatch.enableInput();
		this.dispatch.setCurrActorChoice(null);
		this.dispatch.setViewHome();
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

