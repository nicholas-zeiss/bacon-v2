

import { Component } from '@angular/core';

import { BaconPath } from './shared/bacon-path';
import { PathingService } from './core/pathing.service';
import { ServerCallsService } from './core/server-calls.service';
import { StateService } from './core/state.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(
		private pathing: PathingService,
		private serverCalls: ServerCallsService,
		private state: StateService
	) { }

	search(actor: string) {
		this.state.disableInput();
		this.state.currID = actor;
		this.state.searchError = null;
		this.pathing.pathToLoading();

		this.serverCalls
			.getPathByName(actor)
			.subscribe(this.state.displayBaconPath, this.state.handleError);
	}
}

