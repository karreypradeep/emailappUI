import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleService } from './user-role/user-role.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    UserRoleComponent,
    LoginComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,HttpModule,JsonpModule,
    MaterialModule.forRoot()
  ],
  providers: [UserRoleService,LoginService],
})
export class SecurityModule { }
