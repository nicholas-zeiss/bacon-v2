

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ChooseGuard } from './choose.guard';
import { DisplayGuard } from './display.guard';
import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';
import { StateService } from './state.service';


@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule
	],
	exports: [RouterModule],
	providers: [
		ChooseGuard,
		DisplayGuard,
		PathingService,
		ServerCallsService,
		StateService
	]
})
export class CoreModule { }

