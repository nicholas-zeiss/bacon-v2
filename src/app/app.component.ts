/**
 *
 *	Root component of the application. Holds the input component in its header, then the main view which is a
 *	a dynamic component, and then a static footer. User searches in the input component are handled here.
 *
**/


import { Component, EventEmitter, Type } from '@angular/core';

import { BaconPathService } from './core/bacon-path.service';
import { StateService } from './core/state.service';

import { ChoiceComponent } from './choice/choice.component';
import { DisplayComponent } from './display/display.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';

import { BaconPath, View } from './shared/models';
import { plainString } from './shared/utils';


// Maps the View enum to components
const VIEW_COMPONENT = {
	[View.Choice]: ChoiceComponent as Type<any>,
	[View.Display]: DisplayComponent as Type<any>,
	[View.Error]: ErrorComponent as Type<any>,
	[View.Home]: HomeComponent as Type<any>,
	[View.Loading]: LoadingComponent as Type<any>
};


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	currDisplayActor: string = null;
	homeToggle: EventEmitter<boolean>;
	viewComponent: Type<any>;


	constructor(
		private baconPath: BaconPathService,
		state: StateService
	) {
		state.getView().subscribe((nextView: View): void => {
			this.viewComponent = VIEW_COMPONENT[nextView];
		});

		state.getCurrBaconPath().subscribe((path: BaconPath): void => {
			this.currDisplayActor = path ? plainString(path[0].actor.name) : null;
		});

		state.getHomeToggle().subscribe((toggler: EventEmitter<boolean>): void => {
			this.homeToggle = toggler;
		});
	}


	// initiates displaying an actor's path to bacon, unless that actor is the one currently being
	// displayed or is kevin bacon himself
	search(name: string): void {
		name = plainString(name);

		if (name === 'kevin bacon') {
			// provides a small animation of the kevin bacon background image if on the home component
			this.homeToggle.emit(true);

		} else if (this.currDisplayActor !== name) {
			const storedChoice = this.baconPath.getStoredActorChoice(name);

			// if actor has already been searched display stored result, otherwise query the server
			if (storedChoice) {
				this.baconPath.displayActorChoice(storedChoice);
			} else {
				this.baconPath.searchName(name);
			}
		}
	}
}

