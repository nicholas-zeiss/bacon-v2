

import { Component, OnInit } from '@angular/core';

import { BaconPathService } from './core/bacon-path.service';
import { DispatchService } from './core/dispatch.service';
import { StateService } from './core/state.service';

import { ChoiceComponent } from './choice/choice.component';
import { DisplayComponent } from './display/display.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';

import { View } from './shared/view';


const VIEW_COMPONENTS = {
	[View.Choice]: ChoiceComponent,
	[View.Display]: DisplayComponent,
	[View.Error]: ErrorComponent,
	[View.Home]: HomeComponent,
	[View.Loading]: LoadingComponent
};


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	viewComponent: any;

	constructor(
		private baconPath: BaconPathService,
		private dispatch: DispatchService,
		private state: StateService
	) { }


	ngOnInit() {
		this.state.getView().subscribe((nextView: View) => {
			this.viewComponent = VIEW_COMPONENTS[nextView];
		});
	}


	search(name: string) {
		this.dispatch.disableInput();
		this.baconPath.searchName(name);
	}
}

