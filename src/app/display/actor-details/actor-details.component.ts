

import { Component, Input } from '@angular/core';

import { ActorNode } from '../layout-details';


@Component({
	selector: 'app-actor-details',
	templateUrl: './actor-details.component.html',
	styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent {
	@Input() node: ActorNode;
}

