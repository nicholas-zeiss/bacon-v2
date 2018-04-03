

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { StateService } from './state.service';
import { ActorChoice } from '../shared/actor';


@Injectable()
export class ChooseGuard implements CanActivate {
	private currChoice: ActorChoice;

	constructor(
		private state: StateService,
		private location: Location,
		private router: Router
	) {
		state.choice.subscribe(val => this.currChoice = val);
	}

	canActivate(next: ActivatedRouteSnapshot): boolean {
		const name = next.params.name.replace(/-/g, ' ');

		if ((this.currChoice || {}).name !== name && !this.state.loadStored(name)) {
			this.state.search(name);
			this.router
				.navigateByUrl('', { skipLocationChange: true })
				.then(() => this.location.replaceState(next.url.join('/')));

			return false;
		}

		return true;
	}
}

