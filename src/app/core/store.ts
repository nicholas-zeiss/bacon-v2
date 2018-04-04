

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { AppState, INITIAL_STATE } from '../shared/app-state';

export interface AppStore {
	actions: Subject<any>;
	states: BehaviorSubject<AppState>;
}


export const Store: AppStore = {
	actions: new Subject(),
	states: new BehaviorSubject(INITIAL_STATE)
};

