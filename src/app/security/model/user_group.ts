import {BaseEntity} from '../../core/model/base.entity';
 import {UserGroupUserRole} from './user_group_user_role';

export class UserGroup extends BaseEntity{
    public groupName: string;
    public description: string;
    public userGroupUserRoles: UserGroupUserRole[];

}