

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class PathingService {

	constructor(private location: Location, private router: Router) { }


	pathToChoose(name: string): void {
		this.router.navigateByUrl(`/choose/${name.replace(/\s/g, '-')}`);
	}


	pathToDisplay(nconst: number): void {
		this.router.navigateByUrl(`/display/${nconst}`);
	}


	pathToHome() {
		this.router.navigateByUrl('/home');
	}
}

