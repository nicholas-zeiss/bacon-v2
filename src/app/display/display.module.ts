

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './display.component';

@NgModule({
	imports: [
		CommonModule,
		DisplayRoutingModule
	],
	declarations: [ DisplayComponent ]
})
export class DisplayModule { }

