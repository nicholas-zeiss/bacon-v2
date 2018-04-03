

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ChooseGuard } from './core/choose.guard';
import { DisplayGuard } from './core/display.guard';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent
	},
	{
		path: 'choose/:name',
		canActivate: [ChooseGuard],
		loadChildren: 'app/choice/choice.module#ChoiceModule'
	},
	{
		path: 'display/:nconst',
		canActivate: [DisplayGuard],
		loadChildren: 'app/display/display.module#DisplayModule'
	},
	{
		path: '**',
		redirectTo: ''
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

