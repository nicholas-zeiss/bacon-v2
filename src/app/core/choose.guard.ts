

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
// import { map, reduce, tap } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/reduce';

import { DispatchService } from './dispatch.service';
import { StateService } from './state.service';
import { ActorChoice } from '../shared/actor';


@Injectable()
export class ChooseGuard implements CanActivate {
	constructor(
		private state: StateService,
		private dispatch: DispatchService,
		private location: Location,
		private router: Router
	) { }

	canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
		const name = next.params.name.replace(/-/g, ' ');

		return Observable.merge(
			this.state.getChoice(),
			this.state.getStoredChoices()
		)
			.reduce((valid, curr) => (
				valid || (curr && curr.name === name ? true : false)
			), false);
	}
}

