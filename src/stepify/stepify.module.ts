import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {StepifyComponent} from './stepify.component';
import {StepifyRoutingModule} from './stepify-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {GoalsComponent} from './app/goals/goals.component';
import {GoalsService} from './app/goals/goals.service';
import {GoalDetailsComponent} from './app/goal-details/goal-details.component';
import {FormsModule} from '@angular/forms';
import {ActivatableInputDirective} from './directives/activatable-input.directive';
import {AutoHeightDirective} from './directives/auto-height.directive';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RewardNotificationComponent} from './app/goals/reward-notification/reward-notification.component';
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from './messages/message.service';
import {NavbarComponent} from './app/navbar/navbar.component';
import {NewGoalWizardComponent} from './app/goals/new-goal-wizard/new-goal-wizard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SmallInputNumberDirective} from './directives/small-input-number.directive';
import {DailyHabitCalendarComponent} from './app/goal-details/daily-habit-calendar/daily-habit-calendar.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FilterPipe} from './app/goals/pipes/filter.pipe';
import {FooterComponent} from './footer/footer.component';
import {LoginService} from 'stepify/login/login.service';
import {AuthInterceptor} from './login/authInterceptor';
import {RegistrationComponent} from './registration/registration.component';
import { ImportGoalsComponent } from './app/import-goals/import-goals.component';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    StepifyComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    GoalsComponent,
    GoalDetailsComponent,
    ActivatableInputDirective,
    AutoHeightDirective,
    RewardNotificationComponent,
    MessagesComponent,
    NavbarComponent,
    NewGoalWizardComponent,
    SmallInputNumberDirective,
    DailyHabitCalendarComponent,
    FilterPipe,
    FooterComponent,
    RegistrationComponent,
    ImportGoalsComponent
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    StepifyRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTooltipModule
  ],
  providers: [GoalsService,
    MessageService,
    LoginService,
    GoalsComponent,
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // ### to run app locally
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
    // ###
  ],
  bootstrap: [StepifyComponent]
})
export class StepifyModule {
}
