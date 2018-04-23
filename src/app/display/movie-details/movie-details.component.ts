

import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

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

	ngOnInit() {
		this.arrowDetails = getArrowDetails(this.node.type);
	}

	getAnimationState() {
		if (this.hidden) {
			if (this.node.rowIndex === 0) {
				return /Short/.test(this.node.type) ? 'firstRowHiddenShort' : 'firstRowHidden';
			}

			return 'hidden';
		}

		return 'visible';
	}
}

