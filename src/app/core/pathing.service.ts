

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class PathingService {

	constructor(private location: Location, private router: Router) { }

	pathToChoose(name: string): void {
		const path = `/choose/${name.replace(/\s/g, '-')}`;

		this.router.navigateByUrl(path)
			.then(() => this.location.replaceState(path));
	}

	pathToDisplay(nconst: number): void {
		const path = `/display/${nconst}`;

		this.router.navigateByUrl(path)
			.then(() => this.location.replaceState(path));
	}

	pathToHome(): void {
		this.router.navigateByUrl('/');
	}
}

