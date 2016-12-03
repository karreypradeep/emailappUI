import {BaseEntity} from '../../core/model/base.entity';
import {UserGroup} from './user_group';
 
export class UserAccountUserGroup extends BaseEntity{
    public  userGroup: UserGroup;
}