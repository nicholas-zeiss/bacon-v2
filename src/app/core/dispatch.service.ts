

import { Injectable } from '@angular/core';


import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';

import { Setter } from '../shared/setter';


@Injectable()
@Setter
export class DispatchService {

	constructor(
		private pathing: PathingService,
		private server: ServerCallsService
	) { }

	search(term: ActorID) {
		this.startLoading(term);
		console.log(term)
		this.server
			.search(term)
			.subscribe(
				(res: ActorChoice | BaconPath) => {
					console.log(res)
					this.stopLoading(res);
					res.nconst ?
						this.pathing.pathToDisplay(res.nconst) :
						this.pathing.pathToChoice(res.name);
				},
				(err: SearchError) => {
					console.log(err)
					this.stopLoading(err);
					this.pathing.pathToHome();
				}
			);
	}
}

