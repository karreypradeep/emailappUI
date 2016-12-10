import { Component, OnInit } from '@angular/core';
import { UserRoleService } from "./user-role.service";
import { AuthoritiesByModuleResource } from "../model/authorities.by.module";
import { UserRole } from '../model/user.role';
import { UserRoleSearchCriteria } from '../model/user.role.search.criteria';
import { Message } from 'primeng/primeng';
import { AuthorizationService } from '../../core/authorization.service';

@Component({
  selector: 'user-role',
  templateUrl: './user-role.component.html'
})
export class UserRoleComponent implements OnInit {

  private userRoles: UserRole[];
  private selectedUserRole: UserRole;
  private userRoleSearchCriteria: UserRoleSearchCriteria = new UserRoleSearchCriteria();
  private displayUserRoleDetails: boolean;
  private authoritiesByModule: AuthoritiesByModuleResource[] = [];
  private userRoleAuthorities: string[] = [];
  private updateUserRole: boolean;
  msgs: Message[] = [];

  constructor(private userRoleService: UserRoleService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.getAuthoritiesByModule();
  }

  onRowSelect(event: any) {
    this.selectedUserRole = event.data;
    this.userRoleService.getUserRoleById(this.selectedUserRole.objectId)
      .subscribe(userRoleFromDB => {
        this.selectedUserRole = userRoleFromDB;
        this.userRoleAuthorities = this.selectedUserRole.userRoleAuthorities;
        this.displayUserRoleDetails = true;
        this.updateUserRole = true;
      });
  }


  searchUserRoles() {
    this.userRoleService.getUserRoles(this.userRoleSearchCriteria)
      .subscribe((userRoles) => {
        this.userRoles = userRoles;
      },
      error => {

      });
  };

  resetSearchCriteria() {
     this.userRoleSearchCriteria  = new UserRoleSearchCriteria();
  };

  createUserRole() {
    this.selectedUserRole = new UserRole();
    this.userRoleAuthorities = [];
    this.displayUserRoleDetails = true;
    this.updateUserRole = false;
  };

  backToUserRoles() {
    this.selectedUserRole = new UserRole();
    this.userRoleAuthorities = [];
    this.displayUserRoleDetails = false;
    this.updateUserRole = false;
  };

  submitNewUserRole() {
    this.msgs = [];
    this.displayUserRoleDetails = false;
    this.selectedUserRole.userRoleAuthorities = this.userRoleAuthorities;
    if (this.updateUserRole) {
      this.userRoleService.updateUserRole(this.selectedUserRole)
        .subscribe(() => {
          this.searchUserRoles();
          this.msgs.push({ severity: "info", summary: "User role updated successfully.", detail: "" });
        },
        error => {
          this.msgs.push({ severity: "error", summary: "User role updation failed.", detail: error });
        });
    } else {
      this.userRoleService.createUserRole(this.selectedUserRole)
        .subscribe(() => {
          this.searchUserRoles();
          this.msgs.push({ severity: "info", summary: "User role created successfully.", detail: "" });
        },
        error => {
          this.msgs.push({ severity: "error", summary: "User role creation failed.", detail: error });
        });
    }
  };


  deleteNewUserRole() {
    this.msgs = [];
    this.displayUserRoleDetails = false;
    this.userRoleService.deleteUserRoleById(this.selectedUserRole.objectId)
        .subscribe(() => {
          this.searchUserRoles();
          this.msgs.push({ severity: "info", summary: "User role deleted successfully.", detail: "" });
        },
        error => {
          this.msgs.push({ severity: "error", summary: "User role deletion failed.", detail: error });
        });
  };

  getAuthoritiesByModule() {
    this.userRoleService.getAuthoritiesByModule()
      .subscribe((authorities) => {
        this.authoritiesByModule = authorities;
      },
      error => {

      });
  };

  toggleUserRoleAuthority(item) {
    var idx = this.userRoleAuthorities.indexOf(item);
    if (idx > -1) {
      this.userRoleAuthorities.splice(idx, 1);
    }
    else {
      this.userRoleAuthorities.push(item);
    }
  };

  existsUserRoleAuthority(item) {
    return this.userRoleAuthorities.indexOf(item) > -1;
  };

}
