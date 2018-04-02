

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent {
	path: any[];

	constructor(private state: StateService) {
		this.path = state.currPath.reduce((arr, {actor, movie}) => {
			movie = movie ? { title: movie.title, year: movie.year } : null;
			return arr.concat({ name: actor.name, dob: actor.birthDeath }, movie);
		}, []);
	}
}

