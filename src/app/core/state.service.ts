

import { Injectable } from '@angular/core';

import { BaconPath } from '../shared/bacon-path';
import { SearchError } from '../shared/search-error';


@Injectable()
export class StateService {
	currBaconPath: BaconPath;
	searchError: SearchError;


	constructor() { }

}

