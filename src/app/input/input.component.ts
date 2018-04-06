

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';


@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent {
	@Output() search = new EventEmitter<string>();
	private inputDisabled: boolean;
	private searchForm = new FormGroup({
		name: new FormControl('', Validators.required)
	});


	constructor(
		private dispatch: DispatchService,
		private state: StateService
	) {
		state
			.getInputDisabled()
			.subscribe(disabled => {
				disabled ? this.searchForm.disable() : this.searchForm.enable();
				this.inputDisabled = disabled;
			});
	}


	searchActor() {
		this.search.emit(this.searchForm.value.name);
		this.searchForm.reset();
	}
}

