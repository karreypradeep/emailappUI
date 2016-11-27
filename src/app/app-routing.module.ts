import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { DefaultComponent } from './default';
import { LoginComponent } from './security/login';
import { DashboardComponent } from './dashboard';
import { UserRoleComponent } from './security/user-role';
import { UserGroupComponent } from './security/user-group';
import { UserAccountComponent } from './security/user-account';

const routes: Routes = [ 
  {path:'',component:DefaultComponent},
  {path:'user_roles',component:UserRoleComponent},
  {path:'user_accounts',component:UserAccountComponent},
  {path:'user_groups',component:UserGroupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'appLogin',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmailAppRoutingModule { }
