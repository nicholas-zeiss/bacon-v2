

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class PathingService {

	constructor(private location: Location, private router: Router) { }

	pathToChoose(name: string): void {
		const prevPath = this.router.url;
		const path = `/choose/${name.replace(/\s/g, '-')}`;

		this.router
			.navigateByUrl(path)
			.then(() => {
				if (prevPath === '/loading') {
					this.location.replaceState(path);
				}
			});
	}


	pathToDisplay(id: number): void {
		const prevPath = this.router.url;
		const path = `/display/${id}`;
		console.log('pathing to display', id);
		this.router
			.navigateByUrl(path)
			.then(() => {
				if (prevPath === '/loading') {
					this.location.replaceState(path);
				}
			});
	}

	pathToHome() {
		this.router.navigateByUrl('/home');
	}

	pathToLoading(): void {
		const prevPath = this.router.url;

		this.router
			.navigateByUrl('/loading')
			.then(() => {
				if (/^\/choose/.test(prevPath)) {
					this.location.replaceState('/loading');
				}
			});
	}
}

