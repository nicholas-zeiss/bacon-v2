

import { Directive, ElementRef, EventEmitter, Input, OnInit } from '@angular/core';


@Directive({
	selector: '[appAutoScroll]'
})
export class AutoScrollDirective implements OnInit {
	@Input('appAutoScroll') rowAdded: EventEmitter<number>;

	constructor(private el: ElementRef) { }

	ngOnInit() {
		const rows = this.el.nativeElement.children[0].children;

		this.rowAdded.subscribe(i => setTimeout(() => (
			rows[i].scrollIntoView({
				behavior: 'smooth',
				block: 'end'
			})
		), 0));
	}
}

