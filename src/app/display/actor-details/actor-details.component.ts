

import { Component, Input } from '@angular/core';

import { Actor } from '../../shared/actor';


@Component({
	selector: 'app-actor-details',
	templateUrl: './actor-details.component.html',
	styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent {
	@Input() actor: Actor;
}
