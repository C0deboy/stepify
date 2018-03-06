import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalsService } from './goals/goals.service';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import {FormsModule} from '@angular/forms';
import { ActivatableInputDirective } from './directives/activatable-input.directive';
import { AutoHeightDirective } from './directives/auto-height.directive';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    GoalsComponent,
    GoalDetailsComponent,
    ActivatableInputDirective,
    AutoHeightDirective
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [GoalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
