

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';
import { ActorChoice } from '../shared/actor';

@Component({
	selector: 'app-choice',
	templateUrl: './choice.component.html',
	styleUrls: ['./choice.component.css']
})
export class ChoiceComponent {
	choice: any;

	constructor(private state: StateService) {
		state.choice.subscribe(val => {
			this.choice = val.actors.reduce((arr, actor) => (
				arr.concat(actor.name + ' ' + actor.birthDeath)
			), []);
		});
	}
}

