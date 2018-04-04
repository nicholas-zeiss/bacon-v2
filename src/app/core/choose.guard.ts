

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, reduce, tap, toArray } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/toArray';

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

	canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
		const name = next.params.name.replace(/-/g, ' ');

		return Observable.merge(
			this.state.getChoice(),
			this.state.getStoredChoices()
		)
			.toArray()
			.map((choices) => {
				if (choices.some(c => c && c.name === name)) {
					return true;
				}

				this.dispatch.search(name)
				this.router.navigateByUrl('/');
				return false;
			});
	}
}

