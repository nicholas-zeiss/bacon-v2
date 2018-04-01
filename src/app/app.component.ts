

import { Component } from '@angular/core';

import { ServerCallsService } from './core/server-calls.service';
import { BaconPath } from './shared/bacon-path';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	inputDisabled = false;

	constructor(private serverCalls: ServerCallsService) { }

	search(actor: string) {
		this.inputDisabled = true;

		this.serverCalls
			.getPathByName(actor)
			.subscribe(
				baconPath => {
					this.inputDisabled = false;
					console.log(baconPath);
				},
				error => {
					this.inputDisabled = false;
					console.log(error);
				}
			);
	}
}

