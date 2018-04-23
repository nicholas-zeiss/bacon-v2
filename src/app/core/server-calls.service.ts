

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { Actor, BaconPath, BaconPathNode, SearchError } from '../shared/models';


@Injectable()
export class ServerCallsService {

	constructor(private http: HttpClient) { }

	searchName = (name: string): Observable<Actor[] | BaconPath> => (
		this.http.post('/api/name', { name })
			.catch(err => (
				err.status !== 300 ?
					Observable.throw(new SearchError(name, err.status)) :
					Observable.of(err.error)
			))
	)

	searchNconst = (nconst: number): Observable<BaconPath> => (
		this.http.post('/api/nconst', { nconst })
			.catch(err => (
				Observable.throw(new SearchError(name, err.status))
			))
	)
}

