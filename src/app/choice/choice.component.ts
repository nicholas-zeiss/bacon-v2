

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';
import { Actor, ActorChoice } from '../shared/actor';


@Component({
	selector: 'app-choice',
	templateUrl: './choice.component.html',
	styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnDestroy {
	choice: ActorChoice;
	choiceStr: string[];
	subscription: Subscription;

	constructor(
		private dispatch: DispatchService,
		private state: StateService
	) {
		console.log('choice loaded')
		// this.subscription = state.getChoice((choice: ActorChoice) => {
		// 	this.choice = choice;
		// 	this.choiceString();
		// });
	}

	choiceString() {
		this.choiceStr = this.choice.actors.map((actor: Actor) => (
			actor.name + ' ' + actor.birthDeath
		));
	}

	ngOnDestroy() {
		// this.subscription.unsubscribe();
	}
}

