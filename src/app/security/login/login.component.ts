import { Component, OnInit } from '@angular/core';
import { LoginService } from "./login.service";
import { User } from '../model/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../../core/global.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  submitted = false;
  username : string;
  password : string;
  
  constructor(private loginService: LoginService, private router: Router,private globalService: GlobalService) {     
 }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.login(this.username,this.password);
  }

  getUserName(){
    
  }

  login(username: string ,password: string) {
    this.loginService.login(this.username,this.password)
            .subscribe(() => {
                 this.loggedInUser();
            },
            error => {
                
            });
  };

  loggedInUser() {

    this.loginService.loggedInUser()
            .subscribe((user) => {
                 //console.log('user from server ',user);
                 this.globalService.loggedInUser = user;
                 //sessionStorage.setItem('loggedInUser',JSON.stringify(user));
                 this.globalService.userLoggedIn = true;
                // sessionStorage.setItem('userLoggedIn','true'); 
                 this.pageLinksAllowedForUser();     
            },
            error => {
                
            });
  };

  pageLinksAllowedForUser() {

    this.loginService.pageLinksAllowedForUser()
            .subscribe((pageLinks) => {
                 //console.log('pageLinks from user ',pageLinks);
                 this.globalService.pageLinks = pageLinks;
                 //sessionStorage.setItem('pageLinks',JSON.stringify(pageLinks)); 
                 this.router.navigate(['/']);                 
                 this.router.navigate(['dashboard']);         
            },
            error => {
                
            });
  };

}
