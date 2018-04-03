

import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from './core/state.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	loading: boolean;

	constructor (private state: StateService) {
		state.loading.subscribe(val => this.loading = val);
	}
}

