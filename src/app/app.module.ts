

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { ChoiceComponent } from './choice/choice.component';
import { ChoiceModule } from './choice/choice.module';
import { CoreModule } from './core/core.module';
// import { DisplayCpom } from './display/display.module';
import { DisplayModule } from './display/display.module';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
	declarations: [
		AppComponent,
		ErrorComponent,
		HomeComponent,
		InputComponent,
		LoadingComponent
	],
	entryComponents: [
		// ChoiceComponent,
		// DisplayComponent,
		ErrorComponent,
		HomeComponent,
		LoadingComponent
	],
	imports: [
		BrowserModule,
		ChoiceModule,
		CoreModule,
		DisplayModule,
		ReactiveFormsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

