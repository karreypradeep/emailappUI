import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {AuthoritiesByModuleResource} from '../model/authorities.by.module'
import {UserGroup} from '../model/user_group';
import{UserGroupSearchCriteria} from '../model/user_group_searchcriteria';

@Injectable()
export class UserGroupService {

  constructor(private http: Http) { }

getUserGroups (userGroupSearchCriteria: UserGroupSearchCriteria):  Observable<UserGroup[]>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('userGroups/search', JSON.stringify(userGroupSearchCriteria), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);   
  }

getUserGroupById(id: number): Observable<UserGroup> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('userGroups/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    } 

createUserGroup (userGroup: UserGroup):  Observable<UserGroup>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');      
        return this.http.post('userGroups', JSON.stringify(userGroup), { headers: headers })
            .map((res: Response)  => { return; })
            .catch(this.handleError);   
  }

deleteUserGroupById(id: number): Observable<UserGroup> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('userGroups/' + id)
            .map((res: Response)  => { return; })
            .catch(this.handleError);
} 

updateUserGroup (userGroup: UserGroup):  Observable<UserGroup>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('userGroups' + "/" + userGroup.objectId, JSON.stringify(userGroup), { headers: headers })
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
