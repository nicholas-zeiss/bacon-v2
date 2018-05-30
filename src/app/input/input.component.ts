/**
 *
 *	The component holding the search bar at the top of the page. When a search is executed the search text
 *	is emitted to this component's parent, the AppComponent.
 *
**/


import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent {
	@Output() search = new EventEmitter<string>();

	inputDisabled: boolean;
	searchForm = new FormGroup({ name: new FormControl('', Validators.required) });


	constructor(state: StateService) {
		state.getInputDisabled()
			.subscribe(disabled => {
				disabled ? this.searchForm.disable() : this.searchForm.enable();
				this.inputDisabled = disabled;
			});
	}


	searchActor(): void {
		this.search.emit(this.searchForm.value.name);
		this.searchForm.reset();
	}
}

