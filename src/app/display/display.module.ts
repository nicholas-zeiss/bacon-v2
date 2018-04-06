

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { DisplayComponent } from './display.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
// import { ScrollLockDirective } from './directives/scroll-lock.directive';


@NgModule({
	imports: [
		BrowserAnimationsModule,
		CommonModule
	],
	declarations: [
		ActorDetailsComponent,
		DisplayComponent,
		MovieDetailsComponent,
		// ScrollLockDirective
	],
	entryComponents: [DisplayComponent]
})
export class DisplayModule { }

