/**
 *
 *	This component displays an actor node in the bacon path. It is by default hidden until its turn to be displayed,
 *	at which point it is inserted via an animation. All nodes have their opacity animated, while nodes in the first row
 *	receive additional animations of their width.
 *
 *	This component has two inputs, a 'hidden' attribute yielding a boolean that triggers the node becoming visible,
 *	and the 'node' attribute yielding the DetailNode holding the actor data.
 *
**/


import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { DetailNode } from '../layout-details';


@Component({
	animations: [
		trigger('visibility', [
			state('firstRowHidden', style({ display: 'none', opacity: 0, width: 0 })),
			state('hidden', style({ opacity: 0, width: '10.5rem' })),
			state('visible', style({ opacity: 1, width: '10.5rem' })),
			transition('firstRowHidden => visible', animate('1000ms ease-in-out', keyframes([
					style({ opacity: 0, width: 0, offset: 0 }),
					style({ opacity: 0, width: '10.5rem', offset: .5 }),
					style({ opacity: 1, width: '10.5rem', offset: 1 })
				]))
			),
			transition('hidden => visible', animate('1000ms ease-in-out'))
		])
	],
	selector: 'app-actor-details',
	templateUrl: './actor-details.component.html',
	styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {
	@Input() hidden: boolean;
	@Input() node: DetailNode;

	bSrc = '';								// We must sanitize our img url for the actor in order for angular to display it
	hiddenState = 'hidden';
	visibleState = 'visible';


	constructor(private sanitizer: DomSanitizer) { }


	getAnimationState(): string {
		if (this.hidden) {
			return this.node.rowIndex === 0 ? 'firstRowHidden' : 'hidden';
		}

		return 'visible';
	}


	ngOnInit(): void {
		this.bSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${this.node.actor.imgUrl}')`) as string;
	}
}

