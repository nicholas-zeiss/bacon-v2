

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BaconPathService } from './bacon-path.service';
import { DispatchService } from './dispatch.service';
import { ServerCallsService } from './server-calls.service';
import { StateService } from './state.service';


@NgModule({
	imports: [HttpClientModule],
	providers: [
		BaconPathService,
		DispatchService,
		ServerCallsService,
		StateService
	]
})
export class CoreModule { }

