

import { Component, EventEmitter, Type } from '@angular/core';

import { BaconPathService } from './core/bacon-path.service';
import { StateService } from './core/state.service';

import { ChoiceComponent } from './choice/choice.component';
import { DisplayComponent } from './display/display.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';

import { Actor, BaconPath, View } from './shared/models';
import { plainString } from './shared/utils';


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
		state.getView().subscribe((nextView: View) => {
			this.viewComponent = VIEW_COMPONENT[nextView];
		});

		state.getCurrBaconPath().subscribe((path: BaconPath) => (
			this.currDisplayActor = path ? plainString(path[0].actor.name) : null
		));

		state.getHomeToggle().subscribe((toggler: EventEmitter<boolean>) => (
			this.homeToggle = toggler
		));
	}


	search(name: string): void {
		name = plainString(name);

		if (name === 'kevin bacon') {
			this.homeToggle.emit(true);

		} else if (this.currDisplayActor !== name) {
			const storedChoice = this.baconPath.getStoredActorChoice(name);

			if (storedChoice) {
				this.baconPath.displayActorChoice(storedChoice);
			} else {
				this.baconPath.searchName(name);
			}
		}
	}
}

