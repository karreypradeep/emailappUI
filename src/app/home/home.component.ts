import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageLink } from '../security/model/pagelink';
import { User } from '../security/model/user';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _pageLinks: PageLink[];
  private _user: User;

  constructor(private router: Router, private loginService:LoginService) {    
  }

  ngOnInit() {
  }

  get userLoggedIn(): boolean {
    let userLoggedIn = sessionStorage.getItem('userLoggedIn');
    return userLoggedIn === 'true' ? true : false;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
    this.loginService.logout().subscribe(() => {
          window.location.reload();                
            },
            error => {               
            });
  }


  get pageLinks(): PageLink[] {
    /*this._pageLinks = [];
    let pageLink   = new PageLink();
    pageLink.label = "CONTACTS";
    pageLink.url = "contacts";
    this._pageLinks.push(pageLink);

    pageLink   = new PageLink();
    pageLink.label = "GROUPS";
    pageLink.url = "groups";
    this._pageLinks.push(pageLink);

    pageLink   = new PageLink();
    pageLink.label = "SEND_EMAILS";
    pageLink.url = "send_emails";
    this._pageLinks.push(pageLink); */ 
    this._pageLinks = JSON.parse(sessionStorage.getItem('pageLinks'));
    //console.log(this._pageLinks);
    return this._pageLinks;
  }

  get user(): User {
    this._user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    return this._user;
  }


}
