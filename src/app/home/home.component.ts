import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageLink } from '../security/model/pagelink';
import { User } from '../security/model/user';

@Component({
  selector: 'home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _pageLinks: PageLink[];
  private _user: User;

  constructor(private router: Router) {   
  }

  ngOnInit() {
  }

  get userLoggedIn(): boolean {
    let userLoggedIn = sessionStorage.getItem('userLoggedIn');
    return userLoggedIn === 'true' ? true : false;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }


  get pageLinks(): PageLink[] {
    this._pageLinks = JSON.parse(sessionStorage.getItem('pageLinks'));
    return this._pageLinks;
  }

  get user(): User {
    this._user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    return this._user;
  }


}
