

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class PathingService {

	constructor(private location: Location, private router: Router) { }

	pathToChoice(name: string): void {
		const path = `/choose/${name.replace(/\s/g, '-')}`;

		this.router.navigateByUrl(path);
	}

	pathToDisplay(nconst: number): void {
		const path = `/display/${nconst}`;

		this.router.navigateByUrl(path);
	}

	pathToHome(): void {
		if (this.router.url !== '/') {
			this.router.navigateByUrl('/');
		}
	}
}

