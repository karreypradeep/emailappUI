import { Component, OnInit } from '@angular/core';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(private loginService: LoginService) {
    let userLoggedIn = sessionStorage.getItem('userLoggedIn');
    if (!userLoggedIn) {
      this.logout();
    }
  }


  logout() {
    sessionStorage.clear();
    this.loginService.logout().subscribe(() => {
      //window.location.reload();
    },
      error => {
      });
  }

  ngOnInit() {
  }

}
