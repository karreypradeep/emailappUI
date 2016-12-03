import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {AuthoritiesByModuleResource} from '../model/authorities.by.module'
import {UserRole} from '../model/user.role';
import{UserSearchCriteria} from '../model/user.search.criteria';

@Injectable()
export class UserRoleService {

  constructor(private http: Http) { }

getAuthoritiesByModule ():  Observable<AuthoritiesByModuleResource[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
          return this.http.get('enumConstants/authorityConstants')
         .map(res => res.json()).catch(this.handleError);;     
  }

getUserRoles (userSearchCriteria: UserSearchCriteria):  Observable<UserRole[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');      
        return this.http.post('userRoles/search', JSON.stringify(userSearchCriteria), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);   
  }

getUserRoleById(id: number): Observable<UserRole> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('userRoles/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    } 

createUserRole (userRole: UserRole):  Observable<UserRole>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');      
        return this.http.post('userRoles', JSON.stringify(userRole), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);   
  }

deleteUserRoleById(id: number): Observable<UserRole> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('userRoles/' + id)
            .map((res: Response)  => { return; })
            .catch(this.handleError);
} 

updateUserRole (userRole: UserRole):  Observable<UserRole>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('userRoles' + "/" + userRole.objectId, JSON.stringify(userRole), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);  
  }

  private extractData(res: Response) {     
    let body = res.json();
    console.log('body extractData ' , res);
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
