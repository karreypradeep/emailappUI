import {BaseEntity} from '../../core/model/base.entity';
import {UserRole} from './user.role';
 
export class UserGroupUserRole extends BaseEntity{
    public  userRole: UserRole;
}