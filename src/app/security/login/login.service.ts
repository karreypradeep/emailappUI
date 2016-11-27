import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { User } from '../model/user';
import { PageLink } from '../model/pagelink';

@Injectable()
export class LoginService {
    
  constructor (private http: Http) {    
  }

  login (userName: string, password: string):  Observable<User>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', userName);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString();
        return this.http.post('login', body, options ).catch(this.handleError);     
  }

 loggedInUser ():  Observable<User>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
          return this.http.get('user')
         .map(res => res.json()).catch(this.handleError);;     
  }

 pageLinksAllowedForUser ():  Observable<PageLink>  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
          return this.http.get('pageLinks')
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