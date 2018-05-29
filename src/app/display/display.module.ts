

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { AutoScrollDirective } from './directives/auto-scroll.directive';
import { ScrollLockDirective } from './directives/scroll-lock.directive';
import { DisplayComponent } from './display.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
	imports: [
		BrowserAnimationsModule,
		CommonModule
	],
	declarations: [
		ActorDetailsComponent,
		AutoScrollDirective,
		DisplayComponent,
		MovieDetailsComponent,
		ScrollLockDirective
	],
	entryComponents: [DisplayComponent]
})
export class DisplayModule { }

