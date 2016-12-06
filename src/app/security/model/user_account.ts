import {BaseEntity} from '../../core/model/base.entity';
import {UserAccountUserGroup} from './user_account_user_group';
import {UserAccountTypeConstant} from './UserAccountTypeConstant';

export class UserAccount extends BaseEntity{
    username: string;
    userAccountUserGroups: UserAccountUserGroup[];
    active : boolean;
    accountExpired: boolean;
    credentialsExpired:boolean;
    accountLocked:boolean;
    userAccountType:UserAccountTypeConstant;
    employeeNumber:string;
    email: string;
}