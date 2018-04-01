

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';


const routes: Routes = [
	{
		path: 'choose/:name',
		loadChildren: 'app/choice/choice.module#ChoiceModule'
	},
	{
		path: 'display/:nconst',
		loadChildren: 'app/display/display.module#DisplayModule'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'loading',
		component: LoadingComponent
	},
	{
		path: '**',
		redirectTo: '/home'
	}
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

