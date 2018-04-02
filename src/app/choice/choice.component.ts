

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';
import { Actor } from '../shared/actor';

@Component({
	selector: 'app-choice',
	templateUrl: './choice.component.html',
	styleUrls: ['./choice.component.css']
})
export class ChoiceComponent {
	choices: Actor[];

	constructor(private state: StateService) {
		this.choices = state.currChoices.reduce((arr, actor) => (
			arr.concat({ name: actor.name, dob: actor.birthDeath })
		), []);
	}
}

