import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { DefaultComponent } from './default';
import { LoginComponent } from './security/login';
import { DashboardComponent } from './dashboard';

const routes: Routes = [ 
  {path:'',component:DefaultComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'appLogin',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmailAppRoutingModule { }
