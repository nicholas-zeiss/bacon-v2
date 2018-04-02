

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ChooseGuard } from './core/choose.guard';
import { DisplayGuard } from './core/display.guard';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';


const routes: Routes = [
	{
		path: 'choose/:name',
		loadChildren: 'app/choice/choice.module#ChoiceModule',
		canActivate: [ChooseGuard]
	},
	{
		path: 'display/:nconst',
		loadChildren: 'app/display/display.module#DisplayModule',
		canActivate: [DisplayGuard]
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
	imports: [
		RouterModule.forRoot(
			routes,
			{ preloadingStrategy: PreloadAllModules }
		)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }

