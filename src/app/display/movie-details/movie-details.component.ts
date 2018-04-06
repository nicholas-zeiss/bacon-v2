

import { Component, Input } from '@angular/core';

import { MovieNode } from '../layout-details';


@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
	@Input() node: MovieNode;
}

