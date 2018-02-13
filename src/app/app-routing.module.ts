

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
		loadChildren: 'app/home/home.module#HomeModule'
	},
	{
		path: 'loading',
		loadChildren: 'app/loading/loading.module#LoadingModule'
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

