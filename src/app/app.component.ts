

import { Component } from '@angular/core';

import { DispatchService } from './core/dispatch.service';
import { StateService } from './core/state.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	private loading: boolean;

	constructor (
		private dispatch: DispatchService,
		private state: StateService
	) {
		state.getLoading().subscribe(loading => this.loading = loading);
	}
}

