

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent {
	path: any[] = null;

	constructor(private state: StateService) {
		state.path.subscribe(path => {
			this.path = path.nodes.reduce((arr, {actor, movie}) => {
				movie = movie ? movie.title + ' - ' + movie.year : '';
				return arr.concat([actor.name + ' - ' + actor.birthDeath, movie]);
			}, []);
		});
	}
}

