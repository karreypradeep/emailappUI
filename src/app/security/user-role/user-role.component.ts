import { Component, OnInit } from '@angular/core';
import { UserRoleService } from "./user-role.service";
import { AuthoritiesByModuleResource } from "../model/authorities.by.module";
import { UserRole } from '../model/user.role';
import { UserSearchCriteria } from '../model/user.search.criteria';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'user-role',
  templateUrl: './user-role.component.html'
})
export class UserRoleComponent implements OnInit {

  private userRoles: UserRole[];
  private selectedUserRole: UserRole;
  private userSearchCriteria: UserSearchCriteria = new UserSearchCriteria();
  private displayUserRoleDetails: boolean;
  private authoritiesByModule: AuthoritiesByModuleResource[] = [];
  private userRoleAuthorities: string[] = [];
  private updateUserRole: boolean;

  constructor(private userRoleService: UserRoleService, private router: Router) { }

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
    this.userRoleService.getUserRoles(this.userSearchCriteria)
      .subscribe((userRoles) => {
        this.userRoles = userRoles;
      },
      error => {

      });
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
    this.displayUserRoleDetails = false;
    this.selectedUserRole.userRoleAuthorities = this.userRoleAuthorities;
    if (this.updateUserRole) {
      this.userRoleService.updateUserRole(this.selectedUserRole)
        .subscribe((userRole) => {
          this.searchUserRoles();
        },
        error => {

        });
    } else {
      this.userRoleService.createUserRole(this.selectedUserRole)
        .subscribe((userRole) => {
          this.searchUserRoles();
        },
        error => {

        });
    }


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
