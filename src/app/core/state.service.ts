

import { Injectable } from '@angular/core';

import { distinctUntilChanged, scan } from 'rxjs/operators';

import { Store } from './store';
import { INITIAL_STATE } from '../shared/app-state';
import { Getters } from '../shared/getters';


const compare = (a, b) => {
	for (const key in a) {
		if (a[key] !== b[key]) {
			return false;
		}
	}

	return true;
};


@Injectable()
export class StateService {
	private store = Store;

	constructor () {
		this.store.actions
			.pipe(
				scan((state, action) => action(state), INITIAL_STATE),
				distinctUntilChanged(compare)
			)
				.subscribe(state => {
					console.log(state);
					this.store.states.next(state);
				});

		for (const getter of Getters) {
			this[getter.name] = getter.subscribe(this.store.states);
		}
	}
}

