

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent {
	inputDisabled: boolean;
	searchForm = new FormControl('', Validators.required);

	constructor(private state: StateService) {
		state.inputDisabled.subscribe(disabled => {
			this.inputDisabled = disabled;
			disabled ? this.searchForm.disable() : this.searchForm.enable();
		});
	}

	searchActor() {
		this.state.search(this.searchForm.value);
		this.searchForm.reset();
	}
}

