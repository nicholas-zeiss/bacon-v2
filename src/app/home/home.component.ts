

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	searchError: number;

	constructor(private state: StateService) {
		state.searchError.subscribe(val => this.searchError = val);
	}
}

