/**
 *
 *	This component displays a movie as an arrow connecting two actors in the bacon path via an svg element.
 *	It is by default hidden until its turn to be displayed, at which point it is inserted via an animation.
 *	All nodes have their opacity animated, while nodes in the first row receive additional animations of their width.
 *	As there are two possible sizes of a first row movie node there are two corresponding first row animations.
 *
 *	This component has two inputs, a 'hidden' attribute yielding a boolean that triggers the node becoming visible,
 *	and the 'node' attribute yielding the DetailNode holding the movie data.
 *
**/


import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

import { DetailNode } from '../layout-details';
import { ArrowDetails, getArrowDetails } from './arrow-details';


@Component({
	animations: [
		trigger('visibility', [
			state('firstRowHidden', style({ display: 'none', opacity: 0, width: 0 })),
			state('firstRowHiddenShort', style({ display: 'none', opacity: 0, width: 0 })),
			state('hidden', style({ opacity: 0 })),
			state('visible', style({ opacity: 1 })),
			transition('firstRowHidden => visible', animate('1000ms ease-in-out', keyframes([
					style({ opacity: 0, width: 0, offset: 0 }),
					style({ opacity: 0, width: '248px', offset: .5 }),
					style({ opacity: 1, width: '248px', offset: 1 })
				]))
			),
			transition('firstRowHiddenShort => visible', animate('1000ms ease-in-out', keyframes([
					style({ opacity: 0, width: 0, offset: 0 }),
					style({ opacity: 0, width: '136px', offset: .5 }),
					style({ opacity: 1, width: '136px', offset: 1 })
				]))
			),
			transition('hidden => visible', animate('1000ms ease-in-out'))
		])
	],
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {
	@Input() hidden: boolean;
	@Input() node: DetailNode;

	arrowDetails: ArrowDetails;


	// Once initialized we must get details corresponding to the arrow type used in
	// our svg template
	ngOnInit(): void {
		this.arrowDetails = getArrowDetails(this.node.type);
	}


	getAnimationState(): string {
		if (this.hidden) {
			if (this.node.rowIndex === 0) {
				return /Short/.test(this.node.type) ? 'firstRowHiddenShort' : 'firstRowHidden';
			}

			return 'hidden';
		}

		return 'visible';
	}
}

