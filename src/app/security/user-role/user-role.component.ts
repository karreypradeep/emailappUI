import { Component, OnInit } from '@angular/core';
import { UserRoleService } from "./user-role.service";

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  constructor(private userRoleService: UserRoleService) { }

  ngOnInit() {
    this.getAuthoritiesByModule();
  }

getAuthoritiesByModule() {
    this.userRoleService.getAuthoritiesByModule()
            .subscribe((authorities) => {
                  console.log(authorities);
            },
            error => {
                
            });
  };

}
