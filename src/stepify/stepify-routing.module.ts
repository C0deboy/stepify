import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {GoalsComponent} from './app/goals/goals.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'your-goals', component: GoalsComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StepifyRoutingModule {
}
