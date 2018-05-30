/**
 *
 *	A directive that smooth scrolls to the bottom row of the bacon path when the emitter it is supplied
 *	emits the index of that row, using the scrollIntoView method of the DOM's Element interface. The
 *	smooth scroll behavior is still experimental, so that is pollyfilled by the smoothscroll script loaded
 * 	in the index.html head.
 *
**/


import { Directive, ElementRef, EventEmitter, Input, OnInit } from '@angular/core';


@Directive({
	selector: '[appAutoScroll]'
})
export class AutoScrollDirective implements OnInit {
	@Input('appAutoScroll') rowAdded: EventEmitter<number>;


	constructor(private el: ElementRef) { }


	// The element on which this attribute is placed is the fixed height content container. It's only
	// child holds the actual row elements holding our actor/movie nodes, and is able to overflow this element.
	// We gain access to the live HTML collection of the row elements via our injected element ref.
	ngOnInit(): void {
		const rows = this.el.nativeElement.children[0].children;

		this.rowAdded.subscribe((i: number): void => {
			setTimeout(() => rows[i].scrollIntoView({
				behavior: 'smooth',
				block: 'end'
			}), 0);
		});
	}
}

