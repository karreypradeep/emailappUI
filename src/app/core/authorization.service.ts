import { User } from '../security/model/user';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable()
export class AuthorizationService {

    constructor(private globalService: GlobalService) {
    }

    isUserHasRole(role: string) {
        if (this.globalService.loggedInUser) {
            if (this.globalService.loggedInUser.userType === 'ACC_TYPE_SUPER_ADMIN') {
                return true;
            } else if (this.globalService.loggedInUser.uiRoles.indexOf(role) > 0) {
                return true;
            }
        }
        return false;
    }

}