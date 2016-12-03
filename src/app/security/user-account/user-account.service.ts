import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {UserAccountTypeConstant} from '../model/UserAccountTypeConstant';
import {UserAccountSearchCriteria} from '../model/UserAccountSearchCriteria';
import {UserAccount} from '../model/user_account';

@Injectable()
export class UserAccountService {

  constructor(private http: Http) { }

 
getUserAccounts (userAccountSearchCriteria: UserAccountSearchCriteria):  Observable<UserAccount[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('userAccounts/search', JSON.stringify(userAccountSearchCriteria), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);   
  }

getUserAccountById(id: number): Observable<UserAccount> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('userAccounts/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    } 

createUserAccount (userAccount: UserAccount):  Observable<UserAccount>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('userAccounts', JSON.stringify(userAccount), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);   
  }

deleteUserAccountById(id: number): Observable<UserAccount> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('userAccounts/' + id)
            .map((res: Response)  => { return; })
            .catch(this.handleError);
} 

updateUserAccount (userAccount: UserAccount):  Observable<UserAccount>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('userAccounts' + "/" + userAccount.objectId, JSON.stringify(userAccount), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);  
  }

  private extractData(res: Response) {     
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    //console.log(error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
