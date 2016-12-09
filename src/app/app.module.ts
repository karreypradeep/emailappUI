import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { EmailAppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import './rxjs-extensions';
import 'rxjs/Rx';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { SecurityModule } from './security/security.module';
import { EmailModule } from './email/email.module';
import {GlobalService} from './core/global.service';
import {AuthorizationService} from './core/authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultComponent,
    DashboardComponent   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,JsonpModule,
    MaterialModule.forRoot(),
    EmailAppRoutingModule,
    SecurityModule,
    EmailModule
  ],
  providers: [GlobalService,AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
