

import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
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
	bSrc = '';
	hiddenState = 'hidden';
	visibleState = 'visible';

	constructor(private sanitizer: DomSanitizer) { }

	getAnimationState() {
		if (this.hidden) {
			return this.node.rowIndex === 0 ? 'firstRowHidden' : 'hidden';
		}

		return 'visible';
	}

	ngOnInit() {
		this.bSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${this.node.actor.imgUrl}')`);
	}
}

