

import { Component, EventEmitter, OnInit, Type } from '@angular/core';

import { BaconPathService } from './core/bacon-path.service';
import { DispatchService } from './core/dispatch.service';
import { StateService } from './core/state.service';

import { ChoiceComponent } from './choice/choice.component';
import { DisplayComponent } from './display/display.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';

import { BaconPath, View } from './shared/models';


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
export class AppComponent implements OnInit {
	homeToggle: EventEmitter<boolean>;
	currDisplayActor: string = null;
	viewComponent: Type<any>;

	constructor(
		private baconPath: BaconPathService,
		private dispatch: DispatchService,
		private state: StateService
	) { }


	ngOnInit(): void {
		this.state.getView().subscribe((nextView: View) => {
			this.viewComponent = VIEW_COMPONENT[nextView];
		});

		this.state.getCurrBaconPath().subscribe((path: BaconPath) => (
			this.currDisplayActor = path ? this.formatStr(path[0].actor.name) : null
		));

		this.state.getHomeToggle().subscribe((toggler: EventEmitter<boolean>) => (
			this.homeToggle = toggler
		));
	}


	formatStr(str: string): string {
		return str.trim().toLowerCase().replace(/\s+/, ' ');
	}


	search(name: string): void {
		if (/^\s*kevin\s+bacon\s*$/i.test(name)) {
			this.homeToggle.emit(true);
		} else if (this.currDisplayActor !== this.formatStr(name)) {
			this.dispatch.disableInput();
			this.baconPath.searchName(name);
		}
	}
}

