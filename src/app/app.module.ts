import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {GoalsComponent} from './application/goals/goals.component';
import {GoalsService} from './application/goals/goals.service';
import {GoalDetailsComponent} from './application/goal-details/goal-details.component';
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
import {RewardNotificationComponent} from './application/goals/reward-notification/reward-notification.component';
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from './messages/message.service';
import {NavbarComponent} from './application/navbar/navbar.component';
import {NewGoalWizardComponent} from './application/goals/new-goal-wizard/new-goal-wizard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SmallInputNumberDirective} from './directives/small-input-number.directive';
import {DailyHabitCalendarComponent} from './application/goal-details/daily-habit-calendar/daily-habit-calendar.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FilterPipe} from './application/goals/pipes/filter.pipe';
import {FooterComponent} from './footer/footer.component';
import {LoginService} from 'app/login/login.service';
import {AuthInterceptor} from './login/authInterceptor';
import {RegistrationComponent} from './registration/registration.component';
import { ImportGoalsComponent } from './application/import-goals/import-goals.component';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
