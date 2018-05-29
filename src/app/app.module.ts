

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChoiceComponent } from './choice/choice.component';
import { CoreModule } from './core/core.module';
import { DisplayModule } from './display/display.module';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
	declarations: [
		AppComponent,
		ChoiceComponent,
		ErrorComponent,
		HomeComponent,
		InputComponent,
		LoadingComponent
	],
	entryComponents: [
		ChoiceComponent,
		ErrorComponent,
		HomeComponent,
		LoadingComponent
	],
	imports: [
		BrowserModule,
		CoreModule,
		DisplayModule,
		ReactiveFormsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

