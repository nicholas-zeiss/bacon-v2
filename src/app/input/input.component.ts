

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observer } from 'rxjs/Observer';
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
	@Output() search = new EventEmitter<String>();

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
		this.search.emit(this.searchForm.value);
		this.searchForm.reset();
	}
}

