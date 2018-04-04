

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';


@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent {
	private inputDisabled: boolean;
	private searchForm = new FormControl('', Validators.required);

	constructor(
		private dispatch: DispatchService,
		private state: StateService
	) {
		state.getInputDisabled().subscribe(disabled => {
			disabled ? this.searchForm.disable() : this.searchForm.enable();
			this.inputDisabled = disabled;
		});
	}

	searchActor() {
		this.dispatch.search(this.searchForm.value);
		this.searchForm.reset();
	}
}

