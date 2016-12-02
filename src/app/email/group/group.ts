import {BaseEntity} from '../../core/model/base.entity'

export class Group   extends BaseEntity{
    name: string;
    comments: string;
    contactCount: number;
}