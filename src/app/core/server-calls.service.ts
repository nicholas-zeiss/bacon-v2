

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { ActorChoice } from '../shared/actor';
import { BaconPath, BaconPathNode } from '../shared/bacon-path';
import { SearchError } from '../shared/search-error';


@Injectable()
export class ServerCallsService {

	constructor(private http: HttpClient) { }

	search(term: number | string): Observable<ActorChoice | BaconPath> {
		const [ url, body ] = typeof term === 'string' ? ['/api/name', { name: term }] : ['/api/nconst', { nconst: term }];

		return this.http.post(url, body)
			.map(path => (<BaconPath>{ nconst: path[0].actor._id, nodes: path }))
			.catch(err => err.status === 300 ?
				Observable.of({ actors: err.error, name: err.error[0].name }) :
				Observable.throw(new SearchError(term, err.status))
			);
	}
}

