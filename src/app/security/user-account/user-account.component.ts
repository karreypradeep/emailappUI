import { Component, OnInit } from '@angular/core';
import { UserGroupService } from "../user-group/user-group.service";
import { UserGroup } from '../model/user_group';
import { UserGroupUserRole } from '../model/user_group_user_role';
import { UserGroupSearchCriteria } from '../model/user_group_searchcriteria';
import { UserAccountSearchCriteria } from '../model/UserAccountSearchCriteria';
import { Message } from 'primeng/primeng';
import {UserAccount} from '../model/user_account';
import { UserAccountService } from "../user-account/user-account.service";
import { UserAccountUserGroup } from "../model/user_account_user_group";

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {

  sourceUserAccountUserGroups: UserAccountUserGroup[] = [];
  targetUserAccountUserGroups: UserAccountUserGroup[] = [];
  availableUserGroups: string[] = [];
  userGroupUserRoles: UserGroupUserRole[] = [];
  userAccounts: UserAccount[];
  selectedUserAccount: UserAccount;
  userGroupSearchCriteria: UserGroupSearchCriteria = new UserGroupSearchCriteria();
  userAccountSearchCriteria: UserAccountSearchCriteria = new UserAccountSearchCriteria();
  displayUserAccountDetails: boolean;
  updateUserAccount: boolean;
  msgs: Message[] = [];

  constructor(private userAccountService: UserAccountService, private userGroupService: UserGroupService) { }

  ngOnInit() {
  }

  onRowSelect(event: any) {
    this.selectedUserAccount = event.data;
    this.targetUserAccountUserGroups = [];
    this.availableUserGroups = [];
    this.userAccountService.getUserAccountById(this.selectedUserAccount.objectId)
      .subscribe(userAccountFromDB => {
        this.selectedUserAccount = userAccountFromDB;
        this.targetUserAccountUserGroups = userAccountFromDB.userAccountUserGroups;
        for (var i = 0; i < userAccountFromDB.userAccountUserGroups.length; i++) {
          this.availableUserGroups[i] = userAccountFromDB.userAccountUserGroups[i].userGroup.groupName;
        }
        this.displayUserAccountDetails = true;
        this.updateUserAccount = true;
        this.searchUserGroups();
      });
  }


  searchUserAccounts() {
    this.userAccountService.getUserAccounts(this.userAccountSearchCriteria)
      .subscribe((userAccounts) => {
        this.userAccounts = userAccounts;
      },
      error => {

      });
  };

  searchUserGroups() {
    this.sourceUserAccountUserGroups = [];
    this.userGroupService.getUserGroups(this.userGroupSearchCriteria)
      .subscribe((userGroups) => {
        let count = 0;
        for (let i = 0; i < userGroups.length; i++) {
          if (this.availableUserGroups.indexOf(userGroups[i].groupName)<0) {
            let userAccountUserGroup = new UserAccountUserGroup();
            userAccountUserGroup.userGroup = userGroups[i];
            this.sourceUserAccountUserGroups[count] = userAccountUserGroup;
            count++;
          }
        }
      },
      error => {

      });
  };

  resetSearchCriteria() {
    this.userGroupSearchCriteria = new UserGroupSearchCriteria();
  };

  createUserAccount() {
    this.selectedUserAccount = new UserAccount();
    this.displayUserAccountDetails = true;
    this.updateUserAccount = false;
    this.searchUserGroups();
  };

  backToUserAccounts() {
    this.selectedUserAccount = new UserAccount();
    this.displayUserAccountDetails = false;
    this.updateUserAccount = false;
  };

  submitNewUserGroup() {
    this.msgs = [];
    this.displayUserAccountDetails = false;
    this.selectedUserAccount.userAccountUserGroups = this.targetUserAccountUserGroups;
    if (this.updateUserAccount) {
      this.userAccountService.updateUserAccount(this.selectedUserAccount)
        .subscribe(() => {
          this.searchUserAccounts();
          this.msgs.push({ severity: "info", summary: "User account updated successfully.", detail: "" });
        },
        error => {
          this.msgs.push({ severity: "error", summary: "User account updation failed.", detail: error });
        });
    } else {
      this.userAccountService.createUserAccount(this.selectedUserAccount)
        .subscribe(() => {
          this.searchUserAccounts();
          this.msgs.push({ severity: "info", summary: "User account created successfully.", detail: "" });
        },
        error => {
          this.msgs.push({ severity: "error", summary: "User account creation failed.", detail: error });
        });
    }
  };


  deleteNewUserAccount() {
    this.msgs = [];
    this.displayUserAccountDetails = false;
    this.userAccountService.deleteUserAccountById(this.selectedUserAccount.objectId)
      .subscribe(() => {
        this.searchUserAccounts();
        this.msgs.push({ severity: "info", summary: "User account deleted successfully.", detail: "" });
      },
      error => {
        this.msgs.push({ severity: "error", summary: "User account deletion failed.", detail: error });
      });
  };

}
