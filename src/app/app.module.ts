import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GoalsComponent } from './application/goals/goals.component';
import { GoalsService } from './application/goals/goals.service';
import { GoalDetailsComponent } from './application/goal-details/goal-details.component';
import {FormsModule} from '@angular/forms';
import { ActivatableInputDirective } from './directives/activatable-input.directive';
import { AutoHeightDirective } from './directives/auto-height.directive';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatSlideToggleModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RewardNotificationComponent } from './application/reward-notification/reward-notification.component';
import { ApplicationComponent } from './application/application.component';
import { MessagesComponent } from './messages/messages.component';
import {MessageService} from './messages/message.service';
import { NavbarComponent } from './application/navbar/navbar.component';
import { NewGoalWizardComponent } from './application/new-goal-wizard/new-goal-wizard.component';
import {HttpClientModule} from '@angular/common/http';
import {SmallInputNumberDirective} from './directives/small-input-number.directive';
import { DailyHabitCalendarComponent } from './application/goal-details/daily-habit-calendar/daily-habit-calendar.component';

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
    ApplicationComponent,
    MessagesComponent,
    NavbarComponent,
    NewGoalWizardComponent,
    SmallInputNumberDirective,
    DailyHabitCalendarComponent
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
    MatNativeDateModule,
  ],
  providers: [GoalsService, MessageService, GoalsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
