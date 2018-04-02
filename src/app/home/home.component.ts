

import { Component } from '@angular/core';

import { StateService } from '../core/state.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	constructor(private state: StateService) { }
}

