import { Component, OnInit } from '@angular/core';
import { UserGroupService } from "./user-group.service";
import { UserRoleService } from "../user-role/user-role.service";
import { UserGroup } from '../model/user_group';
import { UserRole } from '../model/user.role';
import { UserGroupUserRole } from '../model/user_group_user_role';
import { UserGroupSearchCriteria } from '../model/user_group_searchcriteria';
import { UserRoleSearchCriteria } from '../model/user.role.search.criteria';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'user-group',
  templateUrl: './user-group.component.html'
})
export class UserGroupComponent implements OnInit {

  sourceUserGroupUserRoles: UserGroupUserRole[] = [];
  targetUserGroupUserRoles: UserGroupUserRole[] = [];
  availableUserRoles: string[] = [];
  userGroupUserRoles: UserGroupUserRole[] = [];
  userGroups: UserGroup[];
  selectedUserGroup: UserGroup;
  userGroupSearchCriteria: UserGroupSearchCriteria = new UserGroupSearchCriteria();
  userRoleSearchCriteria: UserRoleSearchCriteria = new UserRoleSearchCriteria();
  displayUserGroupDetails: boolean;
  updateUserGroup: boolean;
  msgs: Message[] = [];

  constructor(private userGroupService: UserGroupService, private userRoleService: UserRoleService) { }

  ngOnInit() {
  }

  onRowSelect(event: any) {
    this.selectedUserGroup = event.data;
    this.targetUserGroupUserRoles = [];
    this.availableUserRoles = [];
    this.userGroupService.getUserGroupById(this.selectedUserGroup.objectId)
      .subscribe(userGroupFromDB => {
        this.selectedUserGroup = userGroupFromDB;
        this.targetUserGroupUserRoles = userGroupFromDB.userGroupUserRoles;
        for (var i = 0; i < userGroupFromDB.userGroupUserRoles.length; i++) {
          this.availableUserRoles[i] = userGroupFromDB.userGroupUserRoles[i].userRole.roleName;
        }
        this.displayUserGroupDetails = true;
        this.updateUserGroup = true;
        this.searchUserRoles();
      });
  }


  searchUserGroups() {
    this.userGroupService.getUserGroups(this.userGroupSearchCriteria)
      .subscribe((userGroups) => {
        this.userGroups = userGroups;
      },
      error => {

      });
  };

  searchUserRoles() {
    this.sourceUserGroupUserRoles = [];
    this.userRoleService.getUserRoles(this.userRoleSearchCriteria)
      .subscribe((userRoles) => {
        let count = 0;
        for (let i = 0; i < userRoles.length; i++) {
          if (this.availableUserRoles.indexOf(userRoles[i].roleName)<0) {
            let userGroupUserRole = new UserGroupUserRole();
            userGroupUserRole.userRole = userRoles[i];
            this.sourceUserGroupUserRoles[count] = userGroupUserRole;
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

  createUserGroup() {
    this.selectedUserGroup = new UserGroup();
    this.displayUserGroupDetails = true;
    this.updateUserGroup = false;
    this.searchUserRoles();
  };

  backToUserGroups() {
    this.selectedUserGroup = new UserGroup();
    this.displayUserGroupDetails = false;
    this.updateUserGroup = false;
  };

  submitNewUserGroup() {
    this.msgs = [];
    this.displayUserGroupDetails = false;
    this.selectedUserGroup.userGroupUserRoles = this.targetUserGroupUserRoles;
    if (this.updateUserGroup) {
      this.userGroupService.updateUserGroup(this.selectedUserGroup)
        .subscribe(() => {
          this.searchUserGroups();
          this.msgs.push({ severity: "info", summary: "User group updated successfully.", detail: "" });
        },
        error => {
          this.msgs.push({ severity: "error", summary: "User group updation failed.", detail: error });
        });
    } else {
      this.userGroupService.createUserGroup(this.selectedUserGroup)
        .subscribe(() => {
          this.searchUserGroups();
          this.msgs.push({ severity: "info", summary: "User group created successfully.", detail: "" });
        },
        error => {
          this.msgs.push({ severity: "error", summary: "User group creation failed.", detail: error });
        });
    }
  };


  deleteNewUserGroup() {
    this.msgs = [];
    this.displayUserGroupDetails = false;
    this.userGroupService.deleteUserGroupById(this.selectedUserGroup.objectId)
      .subscribe(() => {
        this.searchUserGroups();
        this.msgs.push({ severity: "info", summary: "User group deleted successfully.", detail: "" });
      },
      error => {
        this.msgs.push({ severity: "error", summary: "User group deletion failed.", detail: error });
      });
  };

}
