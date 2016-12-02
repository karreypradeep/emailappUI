import { ContactGroup } from "../contactgroup/contactgroup";
import { Group } from "../group/group";
import {BaseEntity} from '../../core/model/base.entity'

export class Contact  extends BaseEntity{
    firstName: string;
    lastName: string;
    email: string;
    contactGroups: ContactGroup[];
    groupDetails: string;
    groups: Group[];
    moreGroups: Group[];
}