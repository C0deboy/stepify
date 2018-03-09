import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {GoalsComponent} from './application/goals/goals.component';
import {GoalDetailsComponent} from './application/goal-details/goal-details.component';
import {ApplicationComponent} from './application/application.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'your-goals',      component: ApplicationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
