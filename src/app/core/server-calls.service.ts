

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { BaconPath, BaconPathNode } from '../shared/bacon-path';


@Injectable()
export class ServerCallsService {

	constructor(private http: HttpClient) { }

	getPath(term: string | name): Observable<BaconPath | HttpErrorResponse> {
		const [ url, body ] = typeof term === 'string' ?
			['/api/name', { name: term }] :
			['/api/nconst', { nconst: term }];

		return (this.http.post<any>(url, body))
			.pipe(
				map((path: BaconPathNode[]) => (
					{ nconst: path[0]._id, nodes: path }
				))
			);
	}
}

