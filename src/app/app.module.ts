

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		InputComponent,
		LoadingComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

