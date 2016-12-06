import {UserAccountTypeConstant} from './UserAccountTypeConstant';

export class UserAccountSearchCriteria{
    username: string;
    email: string;
    active : boolean;
    accountExpired: boolean;
    credentialsExpired:boolean;
    accountLocked:boolean;
    userAccountType:UserAccountTypeConstant;
}