

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent implements OnChanges {

	searchForm = new FormControl('', Validators.required);
	@Input() disabled: boolean;
	@Output() search = new EventEmitter<String>();

	ngOnChanges(changes) {
		if (!changes.disabled.currentValue && changes.disabled.previousValue) {
			this.searchForm.enable();
		}
	}

	searchActor() {
		this.search.emit(this.searchForm.value);
		this.searchForm.reset();
		this.searchForm.disable();
	}
}

