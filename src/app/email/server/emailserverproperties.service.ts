import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { EmailServer } from "./emailserver";
import { EmailServerProperties } from "./emailserver.properties";

@Injectable()
export class EmailServerPropertiesService {

    private emailServerPropertiesURL = "emailServerProperties";

    constructor(private http: Http) { }

    getEmailServerPropertiesByEmailServerId(emailServerId :number): Observable<EmailServerProperties[]> {
        return this.http.get(this.emailServerPropertiesURL+'/emailServer/' + emailServerId)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    createEmailServerProperty(emailServerProperty: EmailServerProperties,emailServerId :number): Observable<EmailServerProperties> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.emailServerPropertiesURL+ "/" + emailServerId, JSON.stringify(emailServerProperty), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    deleteEmailServerProperty(objectId: number): Observable<void> {
        return this.http.delete(this.emailServerPropertiesURL + "/" + objectId)
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}