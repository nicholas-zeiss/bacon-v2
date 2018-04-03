

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { StateService } from './state.service';
import { BaconPath } from '../shared/bacon-path';


@Injectable()
export class DisplayGuard implements CanActivate {
	private currPath: BaconPath;

	constructor(
		private state: StateService,
		private location: Location,
		private router: Router
	) {
		state.path.subscribe(val => this.currPath = val);
	}

	canActivate(next: ActivatedRouteSnapshot): boolean {
		const nconst = Number(next.params.nconst);

		if ((this.currPath || {}).nconst !== nconst && !this.state.loadStored(nconst)) {
			this.state.search(nconst);
			this.router
				.navigateByUrl('', { skipLocationChange: true })
				.then(() => this.location.replaceState(next.url.join('/')));

			return false;
		}

		return true;
	}
}

