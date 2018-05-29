

import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { StateService } from '../core/state.service';


@Component({
	animations: [
		trigger('toggle', [
			transition('normal => fadeIn', animate('2700ms', keyframes([
				style({ opacity: 0, offset:  0 }),
				style({ opacity: 0, offset: .2 }),
				style({ opacity: 1, offset:  1 }),
			])))
		])
	],
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
	toggled = false;

	private subscription: Subscription;
	private toggleSubscription: Subscription;

	constructor(appState: StateService) {
		this.subscription = appState
			.getHomeToggle()
			.first()
			.subscribe(toggleEmitter => {
				this.toggleSubscription = toggleEmitter.subscribe(toggle => (
					toggle ? this.toggleImage() : null
				));
			});
	}


	toggleImage = (): void => {
		this.toggled = true;
		setTimeout(() => this.toggled = false, 2700);
	}


	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.toggleSubscription.unsubscribe();
	}
}

