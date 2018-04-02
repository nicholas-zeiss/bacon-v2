

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
	private searchTerm = '';

	constructor(private state: StateService) {
		this.searchTerm = typeof state.currID === 'number' ? `index: ${state.currID}` : state.currID;
	}
}

