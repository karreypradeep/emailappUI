import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleService } from './user-role/user-role.service';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupService } from './user-group/user-group.service';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAccountService } from './user-account/user-account.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    UserRoleComponent,
    UserAccountComponent,
    UserGroupComponent,
    LoginComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,HttpModule,JsonpModule,
    MaterialModule.forRoot()
  ],
  providers: [UserRoleService,LoginService,UserGroupService,UserAccountService],
})
export class SecurityModule { }