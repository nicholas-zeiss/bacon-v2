

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
	private searchTerm: string;

	constructor(private state: StateService) {
		state.searchTerm.subscribe(val => (
			this.searchTerm = typeof val === 'number' ? `index: ${val}` : val
		));
	}
}

