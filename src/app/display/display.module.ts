

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayComponent } from './display.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
	imports: [CommonModule],
	declarations: [
		ActorDetailsComponent,
		DisplayComponent,
		MovieDetailsComponent
	],
	entryComponents: [
		DisplayComponent
	]
})
export class DisplayModule { }

