import {BaseEntity} from '../../core/model/base.entity'
 
export class UserRole extends BaseEntity{
    public roleName: string;
    public description: string;
    public userRoleAuthorities: string[];

}