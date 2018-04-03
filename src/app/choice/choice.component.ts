

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

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

	constructor(private state: StateService) {
		this.subscription = state.choice.subscribe(val => {
			this.choice = val;
			this.choiceString();
		});
	}

	choiceString() {
		this.choiceStr = this.choice.actors.map((actor: Actor) => (
			actor.name + ' ' + actor.birthDeath
		));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

