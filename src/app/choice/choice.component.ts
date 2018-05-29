

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { BaconPathService } from '../core/bacon-path.service';
import { DispatchService } from '../core/dispatch.service';
import { StateService } from '../core/state.service';

import { Actor } from '../shared/models';


@Component({
	selector: 'app-choice',
	templateUrl: './choice.component.html',
	styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnDestroy {
	choice: Actor[];

	private subscription: Subscription;


	constructor(
		private baconPath: BaconPathService,
		private dispatch: DispatchService,
		state: StateService
	) {
		this.subscription = state
			.getCurrActorChoice()
			.subscribe(choice => this.choice = choice);
	}


	reset(): void {
		this.dispatch.setViewHome();
	}


	chooseActor(actor: Actor): void {
		this.baconPath.searchNconst(actor._id);
	}


	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

