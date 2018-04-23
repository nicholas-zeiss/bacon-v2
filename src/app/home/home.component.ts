
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../core/state.service';
import 'rxjs/add/operator/first';


@Component({
	animations: [
		trigger('toggle', [
			transition('normal => fadeIn', animate('2700ms', keyframes([
					style({ opacity: 0, offset: 0 }),
					style({ opacity: 0, offset: .2 }),
					style({ opacity: 1, offset: 1 }),
				]))
			)
		])
	],
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
	private eventSub: Subscription;
	private subscription: Subscription;
	toggled = false;

	constructor(appState: StateService) {
		this.subscription = appState
			.getHomeToggle()
			.first()
			.subscribe(toggleEmitter => (
				this.eventSub = toggleEmitter.subscribe(toggle => (
					toggle ? this.toggleImage() : null
				))
			));
	}

	toggleImage = () => {
		this.toggled = true;
		setTimeout(() => this.toggled = false, 2700);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

