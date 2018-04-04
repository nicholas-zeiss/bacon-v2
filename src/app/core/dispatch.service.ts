

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';

import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';
import { Store } from './store';
import { ActorChoice, ActorID } from '../shared/actor';
import { BaconPath } from '../shared/bacon-path';
import { Setters } from '../shared/setters';


@Injectable()
export class DispatchService {
	private store = Store;

	constructor(
		private pathing: PathingService,
		private server: ServerCallsService
	) {
		for (const Setter of Setters) {
			const setter = new Setter(this.store.actions);
			this[setter.name] = setter.dispatch;
		}
	}


	search(term: ActorID) {
		this.startLoading(term);

		this.server
			.search(term)
			.subscribe(
				(res: ActorChoice | BaconPath) => {
					this.stopLoading(res);
					res.nconst ?
						this.pathing.pathToDisplay(res.nconst) :
						this.pathing.pathToChoice(res.name);
				},
				(err: SearchError) => {
					this.stopLoading(err);
					this.pathing.pathToHome();
				}
			);
	}
}

