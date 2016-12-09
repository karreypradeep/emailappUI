import { User } from '../security/model/user';
import { PageLink } from '../security/model/pagelink';
import { Injectable }     from '@angular/core';

@Injectable()
export class GlobalService {
  public loggedInUser:User;
  public userLoggedIn:boolean;
  public pageLinks:PageLink[];

  constructor () { 
  }

}