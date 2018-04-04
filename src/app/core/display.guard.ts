

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';


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
	) { }

	canActivate(next: ActivatedRouteSnapshot): boolean {
		const nconst = Number(next.params.nconst);

		return Observable.merge(
			this.state.getPath(),
			this.state.getStoredPaths()
		)
			.reduce((valid, curr) => (
				valid || (curr && curr.nconst === nconst ? true : false)
			), false)
			.do(valid => {
				if (!valid) {
					this.dispatch.search(nconst);
					this.router.navigateByUrl('/', { skipLocationChange: true });
				}
			});
	}
}

