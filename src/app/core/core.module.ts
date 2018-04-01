

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
		ServerCallsService,
		StateService
	]
})
export class CoreModule { }

