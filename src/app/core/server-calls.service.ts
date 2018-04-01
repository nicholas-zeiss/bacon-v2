

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

import { BaconPath } from '../shared/bacon-path';


@Injectable()
export class ServerCallsService {

	constructor(private http: HttpClient) { }


	getPathByName(name: string): Observable<BaconPath | HttpErrorResponse> {
		return this.http.post<any>('/api/name', { name });
	}


	getPathByNconst(nconst: string): Observable<BaconPath | HttpErrorResponse> {
		return this.http.post<any>('/api/nconst', { nconst });
	}
}

