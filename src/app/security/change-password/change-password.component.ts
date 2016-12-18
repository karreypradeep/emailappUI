import { Component, OnInit } from '@angular/core';
import { UserAccountChangePasswordResource } from '../model/user_account_change_password_resource';
import { UserAccountService } from '../user-account/user-account.service';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userAccountChangePasswordResource: UserAccountChangePasswordResource;
  msgs: Message[] = [];

  constructor(private router: Router,private userAccountService: UserAccountService) {
    this.userAccountChangePasswordResource = new UserAccountChangePasswordResource();
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  submitChangePassword() {
    this.msgs = [];
    this.userAccountService.changeUserPassword(this.userAccountChangePasswordResource)
      .subscribe(() => {
        this.userAccountChangePasswordResource = new UserAccountChangePasswordResource();
        this.msgs.push({ severity: "info", summary: "Password changed successfully.", detail: "" });
      },
      error => {
        this.msgs.push({ severity: "error", summary: "Password updation failed.", detail: error });
      });
  };

}
