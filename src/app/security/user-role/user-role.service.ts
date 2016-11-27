import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {AuthoritiesByModuleResource} from '../model/authorities.by.module'

@Injectable()
export class UserRoleService {

  constructor(private http: Http) { }

getAuthoritiesByModule ():  Observable<AuthoritiesByModuleResource>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
          return this.http.get('enumConstants/authorityConstants')
         .map(res => res.json()).catch(this.handleError);;     
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
