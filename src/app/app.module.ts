

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';


@NgModule({
	declarations: [
		AppComponent,
		InputComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

