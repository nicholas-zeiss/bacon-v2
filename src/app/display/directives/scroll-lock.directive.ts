

import { Directive, HostListener, Input } from '@angular/core';


@Directive({
	selector: '[appScrollLock]'
})
export class ScrollLockDirective {
	@Input() appScrollLock: boolean;
	@HostListener('wheel') onScroll = e => !this.appScrollLock;
}

