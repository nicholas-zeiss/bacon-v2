

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { DispatchService } from './dispatch.service';
import { StateService } from './state.service';
import { BaconPath } from '../shared/bacon-path';


@Injectable()
export class DisplayGuard implements CanActivate {
	private currPath: BaconPath;
	private nconst: number;
	private storedPath: BaconPath;
	private subs: Subscription[];

	constructor(
		private state: StateService,
		private dispatch: DispatchService,
		private location: Location,
		private router: Router
	) {
		const nconst = router.url.match(/\/display\/(.+)$/)[1];
		this.nconst = Number(nconst);

		this.subs.push(state.getPath((path: BaconPath) => {
			this.currPath = path;
		}));

		this.subs.push(state.getStoredPath((path: BaconPath) => {
			this.storedPath = path;
		}), this.nconst);
	}

	canActivate(next: ActivatedRouteSnapshot): boolean {
		this.subs.forEach(sub => sub.unsubscribe());

		if ((this.currPath || {}).nconst !== this.nconst) {
			if (!this.storedPath) {
				this.dispatch.search(this.nconst);
				this.router
					.navigateByUrl('', { skipLocationChange: true })
					.then(() => this.location.replaceState(next.url.join('/')));

				return false;
			}

			this.dispatch.displayPath(this.storedPath);
		}

		return true;
	}
}

