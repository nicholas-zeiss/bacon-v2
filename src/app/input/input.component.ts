

import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent implements OnDestroy {
	inputDisabled: boolean;
	inputDisabledListener: Subscription;
	searchForm = new FormControl('', Validators.required);

	constructor(private state: StateService) {
		const updateInput = disabled => {
			this.inputDisabled = disabled;
			disabled ? this.searchForm.disable() : this.searchForm.enable();
		};

		this.inputDisabledListener = state.listenToInput({
			next: updateInput,
			error: updateInput.bind(null, true),
			complete: updateInput.bind(null, false)
		});

		this.inputDisabled = state.inputDisabled;
	}


	ngOnDestroy() {
		this.inputDisabledListener.unsubscribe();
	}


	searchActor() {
		this.state.search(this.searchForm.value);
		this.searchForm.reset();
	}
}

