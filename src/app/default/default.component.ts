import { Component, OnInit } from '@angular/core';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(private loginService: LoginService) {
    this.logout();
  }


  logout() {
    this.loginService.logout().subscribe(() => {
      //window.location.reload();
    },
      error => {
      });
  }

  ngOnInit() {
  }

}
