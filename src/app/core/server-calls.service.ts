/**
 *
 *	This service handles server requests made upon searching for an actor. Searches can be conducted either
 *	by name, or by a unique id # (aka nconst).
 *
**/


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { Actor, BaconPath } from '../shared/models';
import { wrapSearchError } from '../shared/utils';


// If the error is that of their being multiple choices (response code 300), we return a SearchError object.
// Otherwise, we simply return the errror status.
const convertError = (id: number | string, err: HttpErrorResponse): Observable<any> => (
	err.status === 300 ?
		Observable.of(err.error) :
		Observable.throw(wrapSearchError(String(id), err.status))
);


@Injectable()
export class ServerCallsService {

	constructor(private http: HttpClient) { }


	searchName = (name: string): Observable<Actor[] | BaconPath> => (
		this.http.post('/api/name', { name })
			.catch(err => convertError(name, err))
	)


	searchNconst = (nconst: number): Observable<BaconPath> => (
		this.http.post('/api/nconst', { nconst })
			.catch(err => convertError(nconst, err))
	)
}

