

import { Injectable } from '@angular/core';

import { BaconPath } from '../shared/bacon-path';
import { SearchError } from '../shared/search-error';


@Injectable()
export class StateService {
	storedBaconPaths: BaconPath[] = [];
	currBaconPath: BaconPath = null;
	searchError: SearchError = null;


	constructor() { }

}

